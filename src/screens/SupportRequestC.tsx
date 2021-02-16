
import React from "react";
import {SupportRequestService} from "../services/SupportRequestService";
import { Stack,
    Alert,
    AlertIcon,
    Flex,
    Heading,
    Text,
    Button,
    Image,
    FormControl,
    FormLabel,
    Input, Textarea } from '@chakra-ui/react';

interface SupportRequestTProps{

}

export interface Ticket{
    title?: string;
    text?: string;
    email?: string;
}

interface SupportRequestTState {
    ticket?: Ticket;
    isCreated: boolean;
    hasErrors: boolean;
}

export default class SupportRequestT extends React.Component<SupportRequestTProps, SupportRequestTState> {
    constructor(props: SupportRequestTProps) {
        super(props);
        this.state = {
            ticket: {title: '', text: '', email: ''},
            isCreated: false,
            hasErrors: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const value: string = e.currentTarget.value;
        const key: string = e.currentTarget.name;
        this.setState({ticket: {...this.state.ticket, [key]: value}})
    }

    async handleSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const supportRequestService: SupportRequestService = new SupportRequestService();
        const created = await supportRequestService.sendSupportRequest(
            this.state.ticket?.title,
            this.state.ticket?.text);
        if (created === true) {
            this.setState({isCreated: true, hasErrors: false})
        } else {
            this.setState({isCreated: false, hasErrors: true})
        }

        console.log(this.state);
    };

    render() {
        const classes = this.props;
        const {ticket, isCreated, hasErrors} = this.state;

        const createadMessage = this.state.isCreated ? (
            <Alert status="success"><AlertIcon />Support-Case successfully created</Alert>) :
            null;
        const errorMessage = this.state.hasErrors ? (
                <Alert status="error"><AlertIcon />Jeez - That wasn't working as expected!</Alert>) :
            null;
        return(
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={6} w={'full'} maxW={'lg'}>
                        <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                            <Text
                                as={'span'}
                                position={'relative'}
                                _after={{
                                    content: "''",
                                    width: 'full',
                                    height: '100%',
                                    position: 'absolute',
                                    bottom: 1,
                                    left: 0,
                                    bg: 'green.400',
                                    zIndex: -1,
                                }}>
                                Welcome
                            </Text>
                            <br />{' '}
                            <Text color={'green.400'} as={'span'}>
                                NGINX Unit Support Center
                            </Text>{' '}
                        </Heading>
                        <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>

                        </Text>
                        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                            <form noValidate onSubmit={this.handleSubmit}>
                                <FormControl>
                                    <FormLabel>Title</FormLabel>
                                    <Input type="text" value={ticket?.title} name="title" id="title" onChange={this.onChange} isRequired={true}/>
                                    <FormLabel>Describe Your Problem</FormLabel>
                                    <Textarea value={ticket?.text} name="text" id="text" onChange={this.onChange} isRequired={true} />
                                    <FormLabel>E-Mail Addresss</FormLabel>
                                    <Input type="email" value={ticket?.email} name="email" id="email" onChange={this.onChange}/>
                                </FormControl>
                                 <FormControl pt="1em;">
                                     <Button
                                         type="submit"
                                         rounded={'full'}
                                         bg={'green.400'}
                                         color={'white'}
                                         _hover={{
                                             bg: 'green.500',
                                         }}>
                                         Submit Your Ticket
                                     </Button>
                                 </FormControl>
                                 <FormControl>
                                     {createadMessage}
                                     {errorMessage}
                                 </FormControl>
                            </form>
                        </Stack>
                    </Stack>
                </Flex>
                <Flex flex={1}>
                    <Image
                        alt={'Support Image'}
                        objectFit={'cover'}
                        src={
                            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2552&q=80'
                        }
                    />
                </Flex>
            </Stack>
        );
    }
}
