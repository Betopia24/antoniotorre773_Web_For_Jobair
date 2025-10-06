import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import Heading from "../shared/Heading";
import TaskHeader from "../shared/TaskHeader";
import { BiMicrophone } from "react-icons/bi";
import { HeadphoneOff } from "lucide-react";
import { FaCheck, FaHeadphones, FaMicrophone } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { GiSpeaker } from "react-icons/gi";

const SpeakingTask = () => {
  return (
    <div className="py-20 bg-section-dark">
      <div className="app-container flex flex-col items-start gap-12 w-full">
        {/* Heading */}
        <Heading
          heading="Speaking Tasks"
          subheading="Complete each task to improve your pronunciation and fluency"
          specialText="Tasks"
          align="left"
        />

        <div className="w-full grid grid-cols-2 gap-6">
          {/* Task 01 */}
          <div className="w-full bg-[#2D2F4A] text-white p-6 rounded-xl shadow-lg flex flex-col gap-6">
            <TaskHeader
              title="Pronunciation Practice"
              description="Word Level Training"
              taskNumber={1}
            />

            {/* Test Holder */}
            <div>
              <div className="bg-[#101231] p-6 rounded-xl flex flex-col items-center justify-center gap-6">
                <h1 className="text-3xl sm:text-4xl font-semibold">Dog</h1>
                <p className="px-5 py-2 text-sm rounded-full bg-[#2D2F4A] inline-block">
                  Tap the microphone & say the word clearly
                </p>
                <div className="flex items-center justify-center gap-6">
                  <button className="p-3.5 rounded-full bg-[#2D2F4A]">
                    <FaHeadphones className="w-5 h-5" />
                  </button>
                  <button className="p-3.5 rounded-full bg-gradient-brand">
                    <FaMicrophone className="w-5 h-5" />
                  </button>
                  <button className="p-3.5 rounded-full bg-[#2D2F4A]">
                    <FiRefreshCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center w-full mt-4 px-8 py-4 font-semibold rounded-xl bg-[#464860] cursor-pointer">
                <p className="flex text-sm items-center justify-center gap-2">
                  <FaCheck className="w-4 h-4 p-1 rounded-full bg-gradient-brand text-white" />
                  <span className="text-gradient">
                    Perfect Go to Next Challenge
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Task 02 */}
          <div className="w-full bg-[#2D2F4A] text-white p-6 rounded-xl shadow-lg flex flex-col gap-6">
            <TaskHeader
              title="Phrase Repeat"
              description="Follow Mercury's Lead"
              taskNumber={2}
            />

            {/* Test Holder */}
            <div>
              <div className="bg-[#101231] p-6 rounded-xl flex flex-col items-center justify-center gap-6">
                <h1 className="text-lg sm:text-xl font-semibold bg-gradient-brand py-2 px-6 rounded-xl">
                  Good Morning
                </h1>
                <p className="px-5 py-2 text-sm rounded-full bg-[#2D2F4A] inline-block">
                  Listen first, then repeat after Mercury
                </p>
                <div className="flex items-center justify-center gap-6">
                  <button className="p-3.5 rounded-full bg-[#2D2F4A]">
                    <FaHeadphones className="w-5 h-5" />
                  </button>
                  <button className="p-3.5 rounded-full bg-gradient-brand">
                    <FaMicrophone className="w-5 h-5" />
                  </button>
                  <button className="p-3.5 rounded-full bg-[#2D2F4A]">
                    <FiRefreshCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center w-full mt-4 px-4 py-2 font-semibold rounded-xl bg-[#464860] cursor-pointer">
                <div className="flex items-center justify-between text-sm w-full">
                  <p>Fluency Score</p> <span>90%</span>
                </div>

                {/* Progress bar with gradient */}
                <div className="w-full mt-2 h-2 bg-gray-500 rounded-full">
                  <div className="h-full rounded-full bg-gradient-brand w-[90%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Task 03 */}
          <div className="w-full bg-[#2D2F4A] text-white p-6 rounded-xl shadow-lg flex flex-col gap-6">
            <TaskHeader
              title="Listen & Speak"
              description="Sentence Repetition"
              taskNumber={3}
            />

            {/* Test Holder */}
            <div>
              <div className="bg-[#101231] p-6 rounded-xl flex flex-col items-center justify-center gap-6">
                <div className="bg-gradient-to-br from-[#28284A] to-[#12122A] rounded-xl px-6 py-4 w-full flex items-center flex-col gap-2">
                  <h1 className="text-xl font-semibold">The sun is so hot</h1>
                  <div className="flex items-center gap-2 text-sm">
                    <button className="px-3 py-1 rounded-full bg-[#2D2F4A] flex items-center gap-1">
                      <GiSpeaker /> <span>Listen</span>
                    </button>
                    <button className="px-3 py-1 rounded-full bg-[#2D2F4A] flex items-center gap-1">
                      <span>Slow</span>
                    </button>
                  </div>
                </div>
                <p className="px-5 py-2 text-sm rounded-full bg-[#2D2F4A] inline-block">
                  Now repeat the sentence
                </p>
                <div className="flex items-center justify-center gap-6">
                  <button className="p-3.5 rounded-full bg-[#2D2F4A]">
                    <FaHeadphones className="w-5 h-5" />
                  </button>
                  <button className="p-3.5 rounded-full bg-gradient-brand">
                    <FaMicrophone className="w-5 h-5" />
                  </button>
                  <button className="p-3.5 rounded-full bg-[#2D2F4A]">
                    <FiRefreshCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-start w-full mt-4 px-8 py-4 font-semibold rounded-xl bg-[#464860] cursor-pointer">
                <p className="flex text-sm items-center justify-start gap-2">
                  <FaCheck className="w-4 h-4 p-1 rounded-full bg-gradient-brand text-white" />
                  <span className="text-gradient">
                    Perfect Great Pronunciation!
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Task 04 */}
          <div className="w-full bg-[#2D2F4A] text-white p-6 rounded-xl shadow-lg flex flex-col gap-6">
            <TaskHeader
              title="Vucabulary Challenge"
              description="Daily Word Practice"
              taskNumber={4}
            />
            <div>
              {/* Test Holder */}
              <div className="bg-[#101231] p-6 rounded-xl flex flex-col items-center justify-center gap-6">
                <p className="px-5 py-2 text-sm rounded-full bg-[#2D2F4A] inline-block">
                  Listen first, then repeat after Mercury
                </p>

                {/* 4 Static Divs */}
                <div className="w-full grid grid-cols-2 gap-4 mt-4">
                  {/* Green Border with Checkmark */}
                  <div className="border-2 border-green-500 text-green-500 p-4 rounded-xl flex items-center justify-center gap-2">
                    <FaCheck className="w-5 h-5" />
                    <span>Correct</span>
                  </div>

                  {/* Green Border with Checkmark */}
                  <div className="border-2 border-green-500 text-green-500 p-4 rounded-xl flex items-center justify-center gap-2">
                    <FaCheck className="w-5 h-5" />
                    <span>Correct</span>
                  </div>

                  {/* Gray Border with Microphone */}
                  <div className="border-2 border-gray-500 text-gray-500 p-4 rounded-xl flex items-center justify-center gap-2">
                    <FaMicrophone className="w-5 h-5" />
                    <span>Repeat</span>
                  </div>

                  {/* Gray Border with Microphone */}
                  <div className="border-2 border-gray-500 text-gray-500 p-4 rounded-xl flex items-center justify-center gap-2">
                    <FaMicrophone className="w-5 h-5" />
                    <span>Repeat</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-6">
                  <button className="p-3.5 rounded-full bg-gradient-brand">
                    <FaMicrophone className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-3.5 rounded-full bg-[#2D2F4A]">
                    <FiRefreshCcw className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Word Target Section */}
              <div className="flex flex-col items-center justify-center w-full mt-4 px-4 py-2 font-semibold rounded-xl bg-[#464860] cursor-pointer">
                <div className="flex items-center justify-between text-sm w-full">
                  <p>Word Target</p> <span>10/20</span>
                </div>

                {/* Progress bar with gradient */}
                <div className="w-full mt-2 h-2 bg-gray-500 rounded-full">
                  <div className="h-full rounded-full bg-gradient-brand w-[50%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Complemetion message */}
        <div className="w-full flex items-center justify-center gap-3 border-2 border-green-500 rounded-xl p-6 bg-[#1a2a1a]">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
            <FaCircleCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg text-green-500 font-semibold">
            Well done Jobair! You've finished today's reading session
          </span>
        </div>
      </div>
    </div>
  );
};

export default SpeakingTask;
