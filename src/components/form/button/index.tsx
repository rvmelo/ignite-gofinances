import React from 'react';
import { TouchableWithoutFeedbackProps } from 'react-native';

import { Container, Title } from './styles';

interface Props extends TouchableWithoutFeedbackProps {
    title: string;
    onPress: () => void;
}

export const Button: React.FC<Props> = ({title, onPress, ...rest}) => {
  return (
    <Container onPress={onPress} {...rest}>
        <Title>{title}</Title>
    </Container>
  );
}
