// Addons
import {map, filter} from "lodash";
// React
import React from "react";
import PropTypes from "prop-types";
// Semantic
import {Card, Button, Image, Icon, Label, Popup} from "semantic-ui-react";
// Images
import defaultImg from "../../../../images/default.png";
const CardUsers = (props) => (
  <Card.Group>
    {map(
      props.filters !== "ALL"
        ? filter(props.users, (obj) => obj.params.role === props.filters)
        : props.users,
      (user) => (
        <Card key={user.uid}>
          <Card.Content>
            <Image
              floated="right"
              size="tiny"
              src={user.avatar || defaultImg}
            />
            <Card.Meta>{user.params.role || ""}</Card.Meta>
            <Card.Header>{user.name || ""}</Card.Header>
            <Card.Meta>{user.cin || ""}</Card.Meta>
            <Card.Description>
              <Icon
                color="blue"
                name="fax"
              /> : <strong>{user.telport || ""}</strong> <br />
              <Icon
                color="red"
                name="mail"
              /> : <strong>{user.email || ""}</strong> <br />
              <Icon
                color="green"
                name="map marker"
              /> : <strong>{user.adresse || ""}</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content
            extra
            style={{textAlign: "center"}}
          >
            <Button.Group>
              <Popup
                content="Activate"
                inverted
                trigger={
                  <Button
                    color={user.params.active ? "blue" : "grey"}
                    icon={user.params.active ? "toggle on" : "toggle off"}
                    onClick={() => props.onHandleActivate(user.uid, user.params.active)}
                    size="mini"
                  />
                }
              />
              <Popup
                content="Edit"
                inverted
                trigger={<Button
                  color="green"
                  icon="edit"
                  onClick={() => props.onHandleEditUser(user.uid)}
                  size="mini"
                />}
              />
              <Popup
                content="Change password"
                inverted
                trigger={<Button
                  color="yellow"
                  icon="keycdn"
                  onClick={() => props.onHandlePwdUser(user.email)}
                  size="mini"
                />}
              />
              {user.params.role === "ASSIST" && (
                <Popup
                  content="Assign to Doctors"
                  inverted
                  trigger={<Button
                    color="red"
                    icon="hubspot"
                    onClick={() => props.onHandleAssign(user.uid)}
                    size="mini"
                  />}
                />
              )}
              {user.params.role === "DOCTOR" && (
                <Popup
                  content="Infos"
                  inverted
                  trigger={<Button
                    color="violet"
                    icon="doctor"
                    onClick={() => props.onHandleDoctor(user.uid, user.name)}
                    size="mini"
                  />}
                />
              )}
            </Button.Group>
          </Card.Content>
          <Card.Content extra>
            <Icon
              color={props.isUserOnline(user.uid) ? "green" : "red"}
              name="circle"
            />
            {!props.isUserOnline(user.uid) ? (
              <Label
                color="orange"
                name="circle"
                pointing="left"
                size="mini"
                style={{marginLeft: "0.6em"}}
              >
                {props.timeLastSeeUserOnline(user.uid)}
              </Label>
            ) : (
              <Label
                color="green"
                name="circle"
                pointing="left"
                size="mini"
                style={{marginLeft: "0.6em"}}
              >
                Connected
              </Label>
            )}
          </Card.Content>
        </Card>
      )
    )}
  </Card.Group>
);
CardUsers.propTypes = {
  users: PropTypes.array.isRequired,
  timeLastSeeUserOnline: PropTypes.func.isRequired,
  isUserOnline: PropTypes.func.isRequired,
  onHandleEditUser: PropTypes.func.isRequired,
  onHandleActivate: PropTypes.func.isRequired,
  onHandlePwdUser: PropTypes.func.isRequired,
  onHandleAssign: PropTypes.func.isRequired,
  onHandleDoctor: PropTypes.func.isRequired,
  filters: PropTypes.string.isRequired
};
export default CardUsers;
