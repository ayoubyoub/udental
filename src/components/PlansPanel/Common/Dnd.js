// Addons
/* eslint-disable */
import {ToastContainer} from "react-toastify";
import { debounce } from 'lodash';
import moment from "moment";
import defaultImg from "../../../images/default.png";
import "moment/locale/fr";
import BigCalendar from "react-big-calendar";
import {DateTimeInput} from "semantic-ui-calendar-react";
// React
import React from "react";
// Css
import "react-big-calendar/lib/css/react-big-calendar.css";
// Toolbar
import semanticToolbar from "./semanticToolbar";
// Semantic
import {Segment, Modal, Form, Button, Icon, Input, Rail, Sticky, Search, Header, Feed, Image, List} from "semantic-ui-react";
// DND
const localizer = BigCalendar.momentLocalizer(moment);

const renderDoctors = ({ title, description, image, price }) => (
  <Feed>
    <Feed.Event>
      <Feed.Label>
        <Image src={image || defaultImg} />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          Dr. <Feed.User>{title}</Feed.User>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  </Feed>
);

const renderPatients = ({ title, description, image, price }) => (
  <Feed>
    <Feed.Event>
      <Feed.Label>
        <Image src={image || defaultImg} />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          {price} <Feed.User>{title}</Feed.User>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  </Feed>
);

const Event = ({ event }) => (
  <List>
    <List.Item icon="add to calendar" content={event.patient.name} />
  </List>
);

const EventAgenda = ({ event }) => (
  <List>
    <List.Item icon="user doctor" content={<em style={{ color: event.color }}>{event.doctor.name}</em>} />
    <List.Item icon="add to calendar" content={event.patient.name} />
    <List.Item icon="thumbtack" content={event.title} />
  </List>
);

const Dnd = props => (
  <Segment color="blue" className="bigCalendar">
    <BigCalendar
      components={{ toolbar: semanticToolbar, agenda: { event: EventAgenda }, event: Event }}
      eventPropGetter={event => ({ style: { backgroundColor: event.color } })}
      events={props.events}
      localizer={localizer}
      // onEventDrop={props.handleEventDrop}
      // onEventResize={props.handleEventResize}
      onSelectEvent={props.handleSelectEvent}
      onSelectSlot={props.handleSelectSlot}
      // resizable
      selectable
      popup
      step={15}
      timeslots={2}
    />
    <Modal basic onClose={props.handleCloseModal} open={props.isActive}>
      <Modal.Header>{props.id && <Button inverted color='red' icon='trash alternate' onClick={props.handleDeleteEvent} />} Events </Modal.Header>
      <Modal.Content>
        <ToastContainer />
        <Form onSubmit={props.handleSubmit}>
          <Form.Field>
            <Input autoComplete="off" fluid label="Note" name="title" onChange={props.handleChange} value={props.title} />
          </Form.Field>
          <Form.Field>
            <Search
              loading={props.isLoadingD}
              onResultSelect={props.handleResultSelectD}
              onSearchChange={debounce(props.handleSearchChangeD, 500, { leading: true })}
              placeholder="Doctors"
              results={props.resultsD}
              name="doctors"
              value={props.valueD}
              resultRenderer={renderDoctors}
            />
          </Form.Field>
          <Form.Field>
            <Search
              loading={props.isLoadingP}
              onResultSelect={props.handleResultSelectP}
              onSearchChange={debounce(props.handleSearchChangeP, 500, { leading: true })}
              placeholder="Patients"
              results={props.resultsP}
              name="patients"
              value={props.valueP}
              resultRenderer={renderPatients}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <DateTimeInput
                readOnly
                closable
                autoComplete="off"
                dateFormat="DD/MM/YYYY"
                iconPosition="left"
                name="start"
                onChange={props.handleChange}
                placeholder="Start Date"
                startMode="day"
                value={props.start}
              />
            </Form.Field>
            <Form.Field>
              <DateTimeInput
                readOnly
                closable
                autoComplete="off"
                dateFormat="DD/MM/YYYY"
                iconPosition="left"
                name="end"
                onChange={props.handleChange}
                placeholder="End Date"
                startMode="day"
                value={props.end}
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        {props.isSearch ? (<Button color="green" inverted onClick={props.handleSearch}>
          <Icon name="search" /> Search
        </Button>) : (<Button color="green" inverted onClick={props.handleSubmit}>
          <Icon name="checkmark" /> Valid
        </Button>)}
        <Button basic color="red" inverted onClick={props.handleCloseModal}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
    <Modal onClose={props.handleCloseModal} open={props.isResult}>
    <Modal.Header>Searching</Modal.Header>
    <Modal.Content image scrolling>
      <Modal.Description>
        <Header>Modal Header</Header>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
    <Button secondary onClick={props.handleCloseResults}>
         <Icon name='chevron left' /> Retour
      </Button>
      <Button primary onClick={props.handleCloseModal}>
        Terminer <Icon name='chevron right' />
      </Button>
    </Modal.Actions>
  </Modal>
    <Rail attached internal position="right" className="todayRail">
      <Sticky>
        <Button circular icon="add" color="blue" onClick={props.handleAddSlot} />
        <Button circular icon="search" color="green" onClick={props.handleSearchSlot} />
      </Sticky>
    </Rail>
  </Segment>
);

export default Dnd;
