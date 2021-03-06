import React from "react";
import {DashboardService} from "../services/dashboard/DashboardService";
import {Box, Flex, Heading, Stack, Text, Accordion, AccordionButton, AccordionItem, AccordionIcon, AccordionPanel, Icon, Button} from "@chakra-ui/react";
import {MdBuild, MdDelete, MdDeleteForever} from "react-icons/all";

export interface Ticket {
    id?: string;
    headline?: string;
    text?: string;
    email?: string;
}

interface DashboardProps {
}

interface DashboardState {
    ticketList: Array<Ticket> | null;
}

export default class Dashboard extends React.Component<DashboardProps, DashboardState> {
    private dashboardService: DashboardService;
    constructor(props: DashboardProps) {
        super(props);
        this.dashboardService = new DashboardService();
    }

    async receiveTickets() {
        try {
            const tickets = await this.dashboardService.getAllTickets();
            this.setState({ticketList: tickets});
        } catch (ex) {

        }
    }
    handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) =>  {
       try {
           const re = this.dashboardService.deleteTicketById(e.currentTarget.id);
       } catch (ex) {

       }
    }

    async componentDidMount() {
        await this.receiveTickets();
    }

    createTicketTile(ticket: Ticket) {
        return (
            <AccordionItem>
                <h2>
                    <AccordionButton _expanded={{ bg: "green", color: "white" }}>
                        <Box flex="1" textAlign="left">
                            {ticket.id} - {ticket.headline}
                        </Box>
                        <AccordionIcon/>
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    {ticket.text}
                    <Stack direction="row" spacing={4}>
                        <Button id={ticket.id} leftIcon={<MdDeleteForever />} colorScheme="red" variant="solid" onClick={this.handleDelete}>
                            Delete Ticket
                        </Button>
                    </Stack>
                </AccordionPanel>
            </AccordionItem>
    )
        ;
    }

    render() {
        if (this.state !== null) {
            return (
                <Stack minH={'100vh'} minW={'100vw'} direction={{base: 'column', md: 'row'}}>
                    <Flex p={8} flex={1} align={'center'} justify={'center'}>
                        <Stack spacing={1} w={'full'} maxW={'100vw'}>
                            <Heading fontSize={{base: '3xl', md: '4xl', lg: '5xl'}}>
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
                                    Admin-Dashboard
                                </Text>
                                <br/>{' '}
                                <Text color={'green.400'} as={'span'}>
                                    Ticket-Overview
                                </Text>{' '}
                            </Heading>
                            <Text fontSize={{base: 'md', lg: 'lg'}} color={'gray.500'}>

                            </Text>
                            <Stack direction={{base: 'column', md: 'row'}} spacing={6}>
                                <Accordion  w={'100%'} >
                                    {this.state.ticketList?.map(ticket => {
                                        return this.createTicketTile(ticket)
                                    })}
                                </Accordion>
                            </Stack>
                        </Stack>
                    </Flex>
                </Stack>
            );
        } else {
            return (<p>Loading Tickets...</p>);
        }
    }
}