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
import { InputForm } from '../../components/form/inputForm';
import { useForm } from 'react-hook-form';

interface FormData {
    [key: string]: string;
}

export function Register() {

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const {control, handleSubmit} = useForm();

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

    function handleRegister (form: FormData) {
        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }

        console.log(data);
    } 

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <InputForm 
                        name='name'
                        control={control}
                        placeholder='Nome'
                    />
                    <InputForm 
                        name='amount'
                        control={control}
                        placeholder='Preço'
                    />
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
                <Button title="Enviar" onPress={handleSubmit(handleRegister)}/>
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