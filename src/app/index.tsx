import { Text } from 'react-native';

import { theme } from '../common/theme';

import { Container } from '@/src/components/Container';

export default function Home() {
  return (
    <Container>
      <Text style={{ fontFamily: theme.fonts.bold, fontSize: 24 }}>Home</Text>
    </Container>
  );
}
