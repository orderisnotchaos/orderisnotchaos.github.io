

import "./Ticket.css";

export default function Ticket(props) {

    return(
        <p className="ticket-name">{props.ticket ? props.ticket : 'error al cargar factura'}</p>
    );
}