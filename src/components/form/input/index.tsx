import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

type Props = TextInputProps;

export const Input: React.FC = ({...rest}: Props) => {
  return <Container {...rest} />;
}
