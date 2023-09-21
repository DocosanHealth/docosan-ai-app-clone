import { Image } from 'react-native';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';

export const Avatar = ({ source }: { source: ImageSourcePropType }) => {
  return (
    <Image
      source={source}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
      }}
    />
  );
};
