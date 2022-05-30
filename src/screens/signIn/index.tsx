import React from 'react';

import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';
import LogoSvg from '../../assets/logo.svg';

import { Container, Footer, Header, SignInTitle, Title, TitleWrapper } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

export const SignIn: React.FC = () => {
  return ( 
    <Container>
        <Header>
            <TitleWrapper>
                <LogoSvg width={RFValue(120)} height={RFValue(68)} />
                <Title>
                    Controle suas {'\n'}
                    finanças  de forma {'\n'}
                    muito simples
                </Title>
            </TitleWrapper>
            <SignInTitle>
              Faça o seu login com {'\n'}
              uma das contas abaixo
            </SignInTitle>
        </Header>

        <Footer />

       
    </Container>
  );
}
