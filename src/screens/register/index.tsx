import React, { useState } from 'react';
import {Alert, Keyboard, Modal, TouchableWithoutFeedback} from 'react-native';
import { CategorySelectButton } from '../../components/form/categorySelectButton';
import { Button } from '../../components/form/button';
import {Input} from '../../components/form/input';
import { TransactionTypeButton } from '../../components/form/transactionTypeButton';
import { CategorySelect } from '../categorySelect';

import * as Yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';

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


const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup.number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório')
})

export function Register() {

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

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

        if (!transactionType) {
            return Alert.alert('Selecione o tipo de transação');
        }

        if (category.key === 'category') {
            return Alert.alert('Selecione a categoria');
        }

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }

        console.log(data);
    } 

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm 
                            name='amount'
                            control={control}
                            placeholder='Preço'
                            keyboardType='numeric'
                            error={errors.amount && errors.amount.message}
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
        </TouchableWithoutFeedback>
    );
}