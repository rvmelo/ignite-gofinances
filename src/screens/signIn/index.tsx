import React, { useContext } from 'react';

import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';
import LogoSvg from '../../assets/logo.svg';

import { Container, Footer, FooterWrapper, Header, SignInTitle, Title, TitleWrapper } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';
import { Alert } from 'react-native';

export const SignIn: React.FC = () => {

  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {

      await signInWithGoogle();

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta google');
    }
  }

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

        <Footer>
          <FooterWrapper>
            <SignInSocialButton 
              title="Entrar com Google"
              svg={GoogleSvg}
              onPress={handleSignInWithGoogle}
            />
            <SignInSocialButton 
              title="Entrar com Apple"
              svg={AppleSvg}
            />
          </FooterWrapper>
        </Footer>

       
    </Container>
  );
}
