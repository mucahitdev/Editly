import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Container } from '@/components/Container';

type ToolRoute = '/video-to-gif';

const TOOLS: { id: string; title: string; description: string; route: ToolRoute }[] = [
  {
    id: 'video-to-gif',
    title: 'Video to GIF',
    description: 'Videoları GIF formatına dönüştürün',
    route: '/video-to-gif',
  },
  // Diğer araçlar buraya eklenebilir
];

export default function Home() {
  const router = useRouter();

  return (
    <Container style={styles.container}>
      {TOOLS.map((tool) => (
        <TouchableOpacity key={tool.id} style={styles.card} onPress={() => router.push(tool.route)}>
          <Text style={styles.title}>{tool.title}</Text>
          <Text style={styles.description}>{tool.description}</Text>
        </TouchableOpacity>
      ))}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
