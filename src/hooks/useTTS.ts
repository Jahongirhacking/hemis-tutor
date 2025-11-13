import { setIsAudioPlaying } from '@/store/slices/themeSlice';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export enum AudioModeEnum {
  Playing = 'playing',
  Finished = 'finished',
  Paused = 'paused',
}

const useTTS = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string>();
  const [mode, setMode] = useState<AudioModeEnum>(AudioModeEnum.Finished);
  const audioRef = useRef<HTMLAudioElement>();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const speak = async (text?: string) => {
    if (!text) return; // ⛔ guard clause

    setIsLoading(true);
    dispatch(setIsAudioPlaying(true));
    try {
      const response = await fetch('https://oyqiz.airi.uz/api/v1/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error('TTS request failed');

      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      stopAudio();

      const audio = new Audio(url);
      audioRef.current = audio;

      // optional: ensure it plays after load
      audio.oncanplaythrough = () => {
        audio.play();
        setMode(AudioModeEnum.Playing);
      };

      audio.onended = () => {
        stopAudio();
      };
    } catch (err) {
      console.error('TTS error:', err);
      dispatch(setIsAudioPlaying(false));
    } finally {
      setIsLoading(false);
    }
  };

  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setMode(AudioModeEnum.Paused);
    dispatch(setIsAudioPlaying(false));
  }, []);

  const resumeAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    setMode(AudioModeEnum.Playing);
    dispatch(setIsAudioPlaying(true));
  }, []);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
      dispatch(setIsAudioPlaying(false));
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl('');
    }
    setMode(AudioModeEnum.Finished);
  }, [audioUrl]);

  const onClickBtn = useCallback(
    ({ result }: { result: string }) => {
      if (!mode) return;
      mode === AudioModeEnum.Playing
        ? pauseAudio()
        : mode === AudioModeEnum.Finished
          ? speak(result)
          : resumeAudio();
    },
    [mode]
  );

  useEffect(() => {
    setMode(AudioModeEnum.Finished);
  }, [searchParams]);

  return {
    speak,
    isLoading,
    audioUrl,
    stopAudio,
    mode,
    pauseAudio,
    onClickBtn,
  };
};

export default useTTS;
