import React, { useState } from 'react';
import { CategorySelect } from '../../components/categorySelect';
import { Button } from '../../components/form/button';
import {Input} from '../../components/form/input';
import { TransactionTypeButton } from '../../components/form/transactionTypeButton';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from './styles';

export function Register() {

    const [transactionType, setTransactionType] = useState('');

    function handleSelectionType(type: 'up' | 'down') {
        setTransactionType(type);
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <Input placeholder="Nome" />
                    <Input placeholder="Preço" />
                    <TransactionsTypes>
                        <TransactionTypeButton 
                            title="Income" 
                            type="up" 
                            onPress={() => handleSelectionType('up')}
                            isActive={transactionType === 'up'}
                        />
                        <TransactionTypeButton 
                            title="Outcome" 
                            type="down" 
                            onPress={() => handleSelectionType('down')}
                            isActive={transactionType === 'down'}
                        />
                    </TransactionsTypes>
                    <CategorySelect title='Categoria'/>
                </Fields>
                <Button title="Enviar"/>
            </Form>
        </Container>
    );
}