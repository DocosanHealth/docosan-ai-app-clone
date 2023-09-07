import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';

interface VideoListProps {
  videoUrls: string | undefined;
  hasVideo: boolean;
  poster: string | undefined;
}
const Videos: React.FC<VideoListProps> = ({ videoUrls, hasVideo, poster }) => {
  const videoRef = useRef<Video>(null);

  return (
    <View style={styles.container}>
      {hasVideo ? (
        <Video
          ref={videoRef}
          source={{ uri: videoUrls }} // Thay thế URL bằng đường dẫn đến video của bạn
          style={styles.video}
          controls={false} // Hiển thị điều khiển video
          resizeMode="contain" // Chế độ hiển thị video
          paused={false} // Dừng video khi component được tạo
          poster={poster}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,

  },
  video: {
    width: Dimensions.get('window').width - 150, // Chiều rộng của video
    height: Dimensions.get('window').height - 550, // Chiều cao của video
  },
});

export default Videos;
