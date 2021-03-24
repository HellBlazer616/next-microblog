import {
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from 'react';

interface returnType {
  ref: MutableRefObject<HTMLButtonElement | null>;
  isComponentVisible: boolean;
  setIsComponentVisible: Dispatch<SetStateAction<boolean>>;
}

export default function useOnClickOutSide(
  initialIsVisible: boolean
): returnType {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}
