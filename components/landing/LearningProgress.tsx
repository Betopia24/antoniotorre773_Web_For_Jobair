import React from "react";
import Heading from "../shared/Heading";
import { FaMedal } from "react-icons/fa";
import Link from "next/link";

interface ProgressBarProps {
  label: string;
  value: number;
  max?: number;
  gradient: string; // Tailwind gradient
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  max = 100,
  gradient,
}) => {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm font-medium text-gray-200 mb-1">
        <span>{label}</span>
        <span>
          {value}
          {max !== 100 ? `/${max}` : "%"}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-2 ${gradient}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

const LearningProgress = () => {
  return (
    <div className="py-20 bg-brand-darker">
      <div className="app-container flex flex-col items-center gap-12">
        {/* Heading */}
        <Heading
          heading="Learning You Can See"
          subheading="Track your 30-day, 60-day, and 90-day growth visually, designed for both learners and parents"
          specialText="Can See"
          align="left"
        />

        <div className="mt-6 w-full flex flex-col lg:flex-row gap-10 lg:items-stretch">
          {/* Left section - Progress Tracking */}
          <div className="flex-1 bg-gradient-to-br from-[#2B2E4E] to-brand-darker p-6 rounded-2xl shadow-lg flex flex-col justify-between">
            {/* Top part: Learning progress + filters + bars */}
            <div>
              <div className="flex justify-between items-start">
                <h2 className="text-lgsm:text-xl font-semibold text-white mb-4">
                  Learning Progress
                </h2>

                {/* Day filters */}
                <div className="flex items-center gap-2 mb-4">
                  <p className="px-4 py-1 rounded-full border border-gray-400 text-gray-200 text-xs sm:text-sm font-semibold cursor-pointer bg-gradient-to-r hover:from-gradient-from hover:via-gradient-via hover:to-gradient-to">
                    30 D
                  </p>
                  <p className="px-4 py-1 rounded-full border border-gray-400 text-gray-200 text-xs sm:text-sm font-semibold cursor-pointer bg-gradient-to-r hover:from-gradient-from hover:via-gradient-via hover:to-gradient-to">
                    60 D
                  </p>
                  <p className="px-4 py-1 rounded-full border border-gray-400 text-gray-200 text-xs sm:text-sm font-semibold cursor-pointer bg-gradient-to-r hover:from-gradient-from hover:via-gradient-via hover:to-gradient-to">
                    90 D
                  </p>
                </div>
              </div>

              {/* Progress Bars */}
              <ProgressBar
                label="Reading Comprehension"
                value={67}
                gradient="bg-gradient-to-r from-black via-pink-600 to-orange-500"
              />
              <ProgressBar
                label="Listening Skills"
                value={54}
                gradient="bg-gradient-to-r from-black via-pink-600 to-orange-500"
              />
              <ProgressBar
                label="Speaking Confidence"
                value={73}
                gradient="bg-gradient-to-r from-black via-pink-600 to-orange-500"
              />
              <ProgressBar
                label="Grammar Accuracy"
                value={82}
                gradient="bg-gradient-to-r from-black via-pink-600 to-orange-500"
              />
            </div>

            {/* Bottom part: Daily Goal */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-2">
                Today's Goal
              </h3>
              <ProgressBar
                label="Reading Comprehension"
                value={4}
                max={5}
                gradient="bg-gradient-to-r from-black via-pink-600 to-orange-500"
              />
            </div>
          </div>

          {/* Right section - Analytics */}
          <div className="flex-1 flex flex-col justify-between">
            <p className="text-gray-300 mb-6">
              Our advanced analytics dashboard provides real-time insights into
              learning progress, helping both students and parents understand
              achievements and areas for improvement.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {/* Words Learned */}
              <div className="bg-gradient-to-br from-[#2B2E4E] to-brand-darker p-6 rounded-2xl">
                <h1 className="text-3xl font-bold text-yellow-400">508</h1>
                <p className="text-gray-300 mb-2 text-sm">Words Learned</p>
                <ProgressBar
                  value={80}
                  label=""
                  gradient="bg-gradient-to-r from-yellow-200 to-yellow-600"
                />
              </div>

              {/* Day Streak */}
              <div className="bg-gradient-to-br from-[#2B2E4E] to-brand-darker p-6 rounded-2xl">
                <h1 className="text-3xl font-bold text-pink-400">34</h1>
                <p className="text-gray-300 mb-2 text-sm">Day Streak</p>
                <ProgressBar
                  value={34}
                  max={60}
                  label=""
                  gradient="bg-gradient-to-r from-pink-200 to-pink-600"
                />
              </div>

              {/* Accuracy */}
              <div className="bg-gradient-to-br from-[#2B2E4E] to-brand-darker p-6 rounded-2xl">
                <h1 className="text-3xl font-bold text-blue-400">95%</h1>
                <p className="text-gray-300 mb-2 text-sm">Accuracy</p>
                <ProgressBar
                  value={95}
                  label=""
                  gradient="bg-gradient-to-r from-blue-200 to-blue-600"
                />
              </div>

              {/* Badges */}
              <div className="bg-gradient-to-br from-[#2B2E4E] to-brand-darker p-6 rounded-2xl">
                <h1 className="text-3xl font-bold text-purple-400">12</h1>
                <p className="text-gray-300 mb-2 text-sm">Badges Earned</p>
                <div className="flex items-center gap-2 mt-4">
                  {[...Array(4)].map((_, i) => (
                    <FaMedal key={i} className="text-yellow-500 text-md" />
                  ))}
                  <span className="text-gradient text-sm">+8 more</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2nd part */}
        {/* Heading */}
        <div className="mt-4"/>
        <Heading
          heading="Learning Feels Better When, You're Rewarded"
          subheading="Daily practice unlocks new videos, matched to your passion— sports, dance, cooking, and more"
          specialText="You're Rewarded"
          align="center"
        />
        <div className="w-full bg-gradient-to-br from-[#2B2E4E] to-brand-darker p-6 rounded-2xl shadow-l flex gap-4 items-center">
          <div>
            this one will hold an image image is located in  /featuring-02.png in the center of the image there will be a playbutton play button will have a rounded border bg of gray-500 and in the image not out of the image rather in the image in bottom side there will hge a heding one sub heading a subhjeading will be ...l a fter a fe w line
          </div>
          <div>
            <div>
              <div>icon /icon-04.png will have a gray-500 border</div>
              <div><h1>some text</h1><p>sume following text</p></div>
            </div>
            <div>
              list of this Daily reading practice,  speakingm writing, writing, vocabulary  each item will have a cirecle correct marik for first 2 it will be green marked and for 2 not filled means 2 done 2 undone
            </div>
            <Link href="#" className="rounded-2xl bg-gradient-brand px-6 py-2">lock icon then see full video</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LearningProgress;
