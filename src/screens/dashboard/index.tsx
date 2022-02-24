import React from 'react';


import { 
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon
} from './styles';

export const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>

       <UserWrapper>
          <UserInfo>
            <Photo source={{uri: 'https://avatars.githubusercontent.com/u/9627469?v=4'}} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Roberto</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
       </UserWrapper>
      </Header>
    </Container>
  )
}
