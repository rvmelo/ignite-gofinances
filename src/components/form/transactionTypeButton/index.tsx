import React from 'react';
import { TouchableWithoutFeedbackProps } from 'react-native';

import { 
    Button,
    Container,
    Icon,
    Title, 
} from './styles';

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

interface Props extends TouchableWithoutFeedbackProps {
    title: string;
    type: 'up' | 'down';
    isActive: boolean;
}

export const TransactionTypeButton: React.FC<Props> = ({title, type, isActive, ...rest}) => {
  return (
      <Container 
        type={type} 
        isActive={isActive}
      >
          <Button  {...rest}>
            <Icon name={icons[type]} type={type} />
            <Title>{title}</Title>
          </Button>
      </Container>
  );
}
