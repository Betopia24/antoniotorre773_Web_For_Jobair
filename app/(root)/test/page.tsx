"use client";
import React, { useState, useRef, useEffect } from "react";
import { audioApi } from "@/lib/api";

interface AudioFile {
  id: string;
  filename: string;
  url: string;
  createdAt: string;
  duration?: number;
  fileName?: string;
  audioUrl?: string;
}

export default function AudioRecorderPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [browserSupport, setBrowserSupport] = useState({
    mediaRecorder: false,
    getUserMedia: false,
    audioContext: false,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const maxTimeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const timeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const MAX_RECORDING_TIME = 20 * 60 * 1000; // 20 minutes in milliseconds

  // Check browser compatibility as some old browser versions may not support required APIs
  useEffect(() => {
    const checkBrowserSupport = () => {
      const supportsMediaRecorder =
        typeof MediaRecorder !== "undefined" &&
        MediaRecorder.isTypeSupported?.("audio/webm") !== false;

      const supportsGetUserMedia = !!(
        navigator.mediaDevices?.getUserMedia ||
        (navigator as any).webkitGetUserMedia ||
        (navigator as any).mozGetUserMedia ||
        (navigator as any).msGetUserMedia
      );

      const supportsAudioContext = !!(
        window.AudioContext || (window as any).webkitAudioContext
      );

      setBrowserSupport({
        mediaRecorder: supportsMediaRecorder,
        getUserMedia: supportsGetUserMedia,
        audioContext: supportsAudioContext,
      });

      if (!supportsGetUserMedia) {
        setError(
          "This browser doesn't support audio recording. Please use Chrome, Firefox, Edge, or Safari 11+."
        );
      } else if (!supportsMediaRecorder) {
        setError(
          "Audio recording format not supported. Please use Chrome, Firefox, Edge, or Safari 14.1+."
        );
      }
    };

    checkBrowserSupport();
  }, []);

  // Get supported MIME type for current browser
  const getSupportedMimeType = (): string | undefined => {
    const types = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/mp4",
      "audio/ogg;codecs=opus",
      "audio/wav",
    ];

    for (let type of types) {
      if (MediaRecorder.isTypeSupported?.(type)) {
        return type;
      }
    }
    return undefined;
  };

  // Fallback audio processing without WAV conversion
  const processAudioBlob = async (
    webmBlob: Blob
  ): Promise<{ blob: Blob; extension: string }> => {
    // Try WAV conversion for modern browsers
    if (browserSupport.audioContext) {
      try {
        const wavBlob = await convertToWav(webmBlob);
        return { blob: wavBlob, extension: "wav" };
      } catch (error) {
        console.warn("WAV conversion failed, using original format:", error);
      }
    }

    // Fallback: Use original WebM format
    return { blob: webmBlob, extension: "webm" };
  };

  // Convert WebM to WAV format
  const convertToWav = async (webmBlob: Blob): Promise<Blob> => {
    return new Promise(async (resolve, reject) => {
      try {
        const AudioContext =
          window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContext();

        const arrayBuffer = await webmBlob.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const numberOfChannels = audioBuffer.numberOfChannels;
        const sampleRate = audioBuffer.sampleRate;
        const length = audioBuffer.length;

        const wavBuffer = encodeWAV(audioBuffer, numberOfChannels, sampleRate);
        const wavBlob = new Blob([wavBuffer], { type: "audio/wav" });

        await audioContext.close();
        resolve(wavBlob);
      } catch (error) {
        reject(error);
      }
    });
  };

  // Helper function to encode WAV file
  const encodeWAV = (
    audioBuffer: AudioBuffer,
    numChannels: number,
    sampleRate: number
  ): ArrayBuffer => {
    const length = audioBuffer.length * numChannels * 2;
    const buffer = new ArrayBuffer(44 + length);
    const view = new DataView(buffer);

    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, "RIFF");
    view.setUint32(4, 36 + length, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, length, true);

    // Write PCM data
    const offset = 44;
    let index = offset;

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = audioBuffer.getChannelData(channel);
      for (let i = 0; i < channelData.length; i++) {
        const sample = Math.max(-1, Math.min(1, channelData[i]));
        view.setInt16(
          index,
          sample < 0 ? sample * 0x8000 : sample * 0x7fff,
          true
        );
        index += 2;
      }
    }

    return buffer;
  };

  // Get audio duration from blob
  const getAudioDuration = (blob: Blob): Promise<number> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.src = URL.createObjectURL(blob);
      audio.onloadedmetadata = () => {
        URL.revokeObjectURL(audio.src);
        resolve(audio.duration);
      };
      audio.onerror = () => {
        URL.revokeObjectURL(audio.src);
        resolve(0);
      };
    });
  };

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number): string => {
    if (!isFinite(seconds) || seconds <= 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Format time for recording timer (MM:SS)
  const formatRecordingTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Initialize media recorder
  useEffect(() => {
    if (!browserSupport.getUserMedia || !browserSupport.mediaRecorder) return;

    const initializeRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100,
          },
        });
        streamRef.current = stream;

        const mimeType = getSupportedMimeType();
        console.log("Using MIME type:", mimeType);

        const options = mimeType ? { mimeType } : {};
        const mediaRecorder = new MediaRecorder(stream, options);

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          clearAllTimers();
          setRecordingTime(0);

          if (audioChunksRef.current.length === 0) {
            setError("No audio data recorded");
            return;
          }

          try {
            const mimeType = mediaRecorder.mimeType || "audio/webm";
            const webmBlob = new Blob(audioChunksRef.current, {
              type: mimeType,
            });

            const duration = await getAudioDuration(webmBlob);
            setAudioDuration(duration);

            console.log("Processing audio...");

            // Process audio with fallback
            const { blob: processedBlob, extension } = await processAudioBlob(
              webmBlob
            );

            console.log("Processing successful:", {
              originalSize: webmBlob.size,
              processedSize: processedBlob.size,
              duration: duration,
              format: extension,
            });

            setAudioBlob(processedBlob);
            const url = URL.createObjectURL(processedBlob);
            setAudioUrl(url);
            audioChunksRef.current = [];

            // Upload the processed file
            uploadAudioFile(processedBlob, duration, extension);
          } catch (processingError) {
            console.error("Processing failed:", processingError);
            setError("Failed to process audio. Please try again.");
          }
        };

        mediaRecorder.onerror = (event) => {
          console.error("MediaRecorder error:", event);
          setError("Recording error occurred");
          clearAllTimers();
        };

        mediaRecorderRef.current = mediaRecorder;
      } catch (error) {
        console.error("Error accessing microphone:", error);
        setError("Could not access microphone. Please check permissions.");
      }
    };

    initializeRecorder();

    return () => {
      clearAllTimers();
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [browserSupport]);

  // Clear all timers
  const clearAllTimers = () => {
    [silenceTimerRef, maxTimeTimerRef, timeIntervalRef].forEach((timerRef) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    });
  };

  // Load audio files on component mount
  useEffect(() => {
    fetchAudioFiles();
  }, []);

      const startRecording = () => {
    if (!browserSupport.mediaRecorder) {
      setError("Audio recording not supported in this browser.");
      return;
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "inactive"
    ) {
      audioChunksRef.current = [];
      setError("");
      setAudioDuration(0);
      setRecordingTime(0);

      mediaRecorderRef.current.start(1000);
      setIsRecording(true);

      startSilenceDetection();
      startMaxTimeTimer();
      startTimeCounter();
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearAllTimers();
    }
  };

  const startSilenceDetection = () => {
    silenceTimerRef.current = setTimeout(() => {
      if (isRecording) {
        console.log("Silence detected - stopping recording");
        stopRecording();
      }
    }, 5000);
  };

  const startMaxTimeTimer = () => {
    maxTimeTimerRef.current = setTimeout(() => {
      if (isRecording) {
        console.log("Maximum recording time reached (20 minutes)");
        setError("Maximum recording time reached (20 minutes)");
        stopRecording();
      }
    }, MAX_RECORDING_TIME);
  };

  const startTimeCounter = () => {
    const startTime = Date.now();

    timeIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setRecordingTime(elapsed);

      if (elapsed > MAX_RECORDING_TIME - 30000) {
        setError(
          `Recording will stop in ${Math.ceil(
            (MAX_RECORDING_TIME - elapsed) / 1000
          )} seconds`
        );
      }
    }, 1000);
  };

  const resetSilenceTimer = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
    if (isRecording) {
      startSilenceDetection();
    }
  };

  const uploadAudioFile = async (
    audioBlob: Blob,
    duration: number,
    extension: string
  ) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      const filename = `recording-${Date.now()}.${extension}`;

      formData.append("file", audioBlob, filename);
      formData.append("duration", Math.round(duration).toString());

      console.log("Uploading audio file:", {
        filename,
        size: audioBlob.size,
        type: audioBlob.type,
        duration: duration,
      });

      const response = await audioApi.uploadAudio(formData);
      console.log("Upload successful:", response);

      await fetchAudioFiles();
      setError("");
    } catch (error: any) {
      console.error("Error uploading audio:", error);

      let errorMessage = "Failed to upload audio file";
      if (error.response?.status === 500) {
        errorMessage = "Server error (500). Please try again.";
      } else if (error.response?.data?.message) {
        errorMessage = `Server error: ${error.response.data.message}`;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAudioFiles = async () => {
    try {
      const response = await audioApi.getAllAudio();

      if (Array.isArray(response)) {
        setAudioFiles(response);
      } else if (response.data && Array.isArray(response.data)) {
        setAudioFiles(response.data);
      } else if (response.files && Array.isArray(response.files)) {
        setAudioFiles(response.files);
      } else {
        setAudioFiles([]);
      }
    } catch (error: any) {
      console.error("Error fetching audio files:", error);
      setError("Failed to load audio files");
    }
  };

  const deleteAudioFile = async (fileId: string) => {
    try {
      await audioApi.deleteAudio(fileId);
      await fetchAudioFiles();

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl("");
        setAudioBlob(null);
      }
    } catch (error) {
      console.error("Error deleting audio file:", error);
      setError("Failed to delete audio file");
    }
  };

  const handleSpeakButtonClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleRetryConnection = () => {
    setError("");
    fetchAudioFiles();
  };

  // Browser support warning
  if (!browserSupport.getUserMedia) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <p className="font-bold">Browser Not Supported</p>
            <p>This browser doesn't support audio recording. Please use:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Chrome 47+</li>
              <li>Firefox 44+</li>
              <li>Edge 12+</li>
              <li>Safari 11+</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark to-brand-darker py-16 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Audio Recorder
        </h1>

        {/* Browser Support Info */}
        {!browserSupport.mediaRecorder && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
            <p>
              Using basic audio recording. For best experience, use Chrome,
              Firefox, or Safari 14.1+.
            </p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={handleRetryConnection}
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Recording Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col items-center space-y-6">
            <button
              onClick={handleSpeakButtonClick}
              onMouseDown={resetSilenceTimer}
              onTouchStart={resetSilenceTimer}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-semibold text-lg transition-all duration-200 ${
                isRecording
                  ? "bg-red-500 hover:bg-red-600 animate-pulse"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={isLoading || !browserSupport.mediaRecorder}
            >
              {isRecording ? "Stop" : "Speak"}
            </button>

            <div className="text-center">
              <p
                className={`text-lg font-medium ${
                  isRecording ? "text-red-600" : "text-gray-600"
                }`}
              >
                {isRecording
                  ? "Recording... Speak now!"
                  : "Click to start recording"}
              </p>

              {isRecording && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-blue-600">
                    Time: {formatRecordingTime(recordingTime)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum: 20 minutes • Stops after 5 seconds of silence
                  </p>
                </div>
              )}

              {audioDuration > 0 && !isRecording && (
                <p className="text-sm text-green-600 mt-2">
                  Recorded: {formatTime(audioDuration)}
                </p>
              )}
            </div>

            {isLoading && (
              <div className="text-blue-600 font-medium">
                {isRecording ? "Processing..." : "Uploading audio..."}
              </div>
            )}

            {audioUrl && !isRecording && (
              <div className="w-full max-w-md">
                <p className="text-sm text-gray-600 mb-2">
                  Preview (Duration: {formatTime(audioDuration)}):
                </p>
                <audio controls className="w-full">
                  <source
                    src={audioUrl}
                    type={audioBlob?.type || "audio/wav"}
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        </div>

        {/* Rest of the component remains the same */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Recorded Audio Files
            </h2>
            <button
              onClick={fetchAudioFiles}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              Refresh
            </button>
          </div>

          {audioFiles.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No audio files recorded yet.
            </p>
          ) : (
            <div className="space-y-4">
              {audioFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {file.fileName || file.filename}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{new Date(file.createdAt).toLocaleString()}</span>
                      {file.duration && (
                        <span className="text-green-600">
                          Duration: {formatTime(file.duration)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <audio controls className="h-8">
                      <source
                        src={file.audioUrl || file.url}
                        type="audio/wav"
                      />
                      Your browser does not support the audio element.
                    </audio>

                    <button
                      onClick={() => deleteAudioFile(file.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
