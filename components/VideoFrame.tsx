"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "./icons";

type Props = {
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
  /** id of a visible caption elsewhere that describes this video */
  describedBy?: string;
  /** When set, the control sits in an ink bar under the video with this caption, off the screenshot. */
  caption?: string;
  /** Plays muted on loop while on screen, unless the visitor prefers reduced motion or saves data. */
  ambient?: boolean;
  className?: string;
};

// A product walkthrough inside an ink screen frame. Ambient frames play while
// visible and always offer pause (WCAG 2.2.2); the others wait for a click.
export default function VideoFrame({ src, poster, width, height, label, describedBy, caption, ambient = false, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || !ambient) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [ambient, userPaused]);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      video.play().catch(() => {});
    } else {
      setUserPaused(true);
      video.pause();
    }
  }

  return (
    <figure className={`screen slice ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        aria-describedby={describedBy}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="block h-auto w-full"
      />
      {caption ? (
        <figcaption className="flex items-center gap-3 border-t-[6px] border-ink bg-ink pr-3 text-cream">
          <button
            type="button"
            onClick={toggle}
            className="btn btn-mustard min-h-11 px-3.5 text-sm"
            aria-label={playing ? `Pause ${label}` : `Play ${label}`}
          >
            {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
            <span aria-hidden="true">{playing ? "Pause" : "Play"}</span>
          </button>
          <span className="label">{caption}</span>
        </figcaption>
      ) : (
        <button
          type="button"
          onClick={toggle}
          className="btn btn-mustard absolute bottom-0 left-0 z-10 min-h-11 min-w-11 justify-center px-3 text-sm sm:bottom-3 sm:left-3 sm:px-3.5"
          aria-label={playing ? `Pause ${label}` : `Play ${label}`}
        >
          {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          {/* icon only on narrow screens so the control doesn't cover the work */}
          <span aria-hidden="true" className="hidden sm:inline">{playing ? "Pause" : "Play"}</span>
        </button>
      )}
    </figure>
  );
}
