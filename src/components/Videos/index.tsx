import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';

interface VideoListProps {
  videoUrls: string | undefined;
  hasVideo: boolean;
  poster: string | undefined;
  controls: boolean;
  paused: boolean;
  resizeModeVideo: any;
}
const Videos: React.FC<VideoListProps> = ({ videoUrls, hasVideo, poster, controls, paused, resizeModeVideo }) => {
  const videoRef = useRef<Video>(null);

  return (
    <View style={styles.container}>
      {hasVideo ? (
        <Video
          ref={videoRef}
          source={{ uri: videoUrls }} // Thay thế URL bằng đường dẫn đến video của bạn
          style={styles.video}
          controls={controls} // Hiển thị điều khiển video
          resizeMode={resizeModeVideo} // Chế độ hiển thị video
          paused={paused} // Dừng video khi component được tạo
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
    flex: 1,
  },
  video: {
    marginVertical: 10,
    width: Dimensions.get('window').width - 150, // Chiều rộng của video
    height: '100%',
  },
});

export default Videos;
