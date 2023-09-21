import { useEffect, useState } from 'react';
import { Text, TextStyle } from 'react-native';

type Props = {
  text: string;
  delay: number;
  style?: TextStyle;
};
const Typewriter = ({ text, delay, style }: Props) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: any;

    const _words = text.split(' ');
    if (currentIndex < _words.length) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + ' ' + _words[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
    }

    // lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum
    return () => clearTimeout(timeout);
  }, [currentIndex, text]);

  return <Text style={style}>{currentText}</Text>;
};

export default Typewriter;
