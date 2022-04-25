import React, { useState } from 'react';
import {Modal} from 'react-native';
import { CategorySelectButton } from '../../components/form/categorySelectButton';
import { Button } from '../../components/form/button';
import {Input} from '../../components/form/input';
import { TransactionTypeButton } from '../../components/form/transactionTypeButton';
import { CategorySelect } from '../categorySelect';

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
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    function handleSelectionType(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal () {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal () {
        setCategoryModalOpen(false);
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
                    <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} />
                </Fields>
                <Button title="Enviar"/>
            </Form>
            <Modal visible={categoryModalOpen}>
               <CategorySelect 
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
               />
            </Modal>
        </Container>
    );
}