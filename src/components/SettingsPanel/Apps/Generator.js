// Addons
import {isEmpty, orderBy, values, now, isNumber, filter} from "lodash";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
// React
import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// Semantic
import {
  Button,
  Icon,
  Confirm,
  Grid,
  Modal,
  Form,
  Input
} from "semantic-ui-react";
// Actions
import {
  saveSetting,
  deleteSetting,
  activeSetting,
  labelSetting
} from "../../../actions/settingsAction";
// Begin
class Generator extends Component {
  constructor (props) {
    super(props);
    this.state = {
      defaultPageSize: 5,
      id: "",
      label: "",
      defaultSorted: [
        {
          id: "nom",
          desc: true
        }
      ],
      previousText: "Previous",
      nextText: "Next",
      loadingText: "Loading...",
      noDataText: "No rows found",
      pageText: "Page",
      ofText: "of",
      rowsText: "rows",
      deleteID: "",
      filterable: true,
      loading: false,
      open: false,
      modal: false,
      setting: []
    };
  }

  componentDidMount () {
    this.getSetting(this.props.settings[this.props.settingOf]);
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.settings[this.props.settingOf] !==
      this.props.settings[this.props.settingOf]
    ) {
      this.getSetting(nextProps.settings[this.props.settingOf]);
    }
  }

  getSetting = (setting) => {
    this.setState({loading: true});
    const settingArr = orderBy(filter(values(setting), (obj) => obj.id !== 0), ["label"], ["desc"]);
    this.setState({
      setting: settingArr,
      loading: false
    });
  };

  handleSubmit = () => {
    const {label} = this.state;
    this.submit(label);
    this.handleModalClose();
  };

  editeRow = async (rowID, rowLabel) => {
    await this.setState({
      id: rowID,
      label: rowLabel
    }, () => {
      this.handleModalOpen();
    });
  };

  submit = (label) => {
    if (!isEmpty(label)) {
      let key = now();
      let setting = "";
      if (isNumber(this.state.id)) {
        key = this.state.id;
        setting = {label};
        this.props
          .labelSetting(key, this.props.settingOf, setting)
          .then(() => {
            this.props.notifyEdit("🚀 La modification a été effectué.", "top-right");
          })
          .catch((err) => {
            this.props.notifyError(`🚫 Envoyer un screenshot pour le support en signalant [ERR0001-${
              now()
            }: ${
              err
            }]`, "top-center");
          });
      } else {
        setting = {
          [key]: {
            id: key,
            label,
            active: true
          }
        };
        this.props
          .saveSetting(this.props.settingOf, setting)
          .then(() => {
            this.props.notifyAdd("🚀 L'insertion a été effectué.", "top-right");
          })
          .catch((err) => {
            this.props.notifyError(`🚫 Envoyer un screenshot pour le support en signalant [ERR0002-${
              now()
            }: ${
              err
            }]`, "top-center");
          });
      }
    }
  };

  handleDelete = () => {
    const {deleteID} = this.state;
    this.props
      .deleteSetting(this.props.settingOf, deleteID)
      .then(() => {
        this.props.notifyDelete("🚀 La suppression a été effectué.", "top-right");
      })
      .catch((err) => {
        this.props.notifyError(`🚫 Envoyer un screenshot pour le support en signalant [ERR0003-${
          now()
        }: ${
          err
        }]`, "top-center");
      });
    this.setState({open: false});
  };

  activeRow = (rowID, rowActive) => {
    const setting = {active: !rowActive};
    this.props
      .activeSetting(rowID, this.props.settingOf, setting)
      .then(() => {
        this.props.notifyEdit("🚀 La modification a été effectué.", "top-right");
      })
      .catch((err) => {
        this.props.notifyError(`🚫 Envoyer un screenshot pour le support en signalant [ERR0004-${
          now()
        }: ${
          err
        }]`, "top-center");
      });
  };

  open = (rowID) => {
    this.setState({
      open: true,
      deleteID: rowID
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      id: "",
      label: ""
    });
  };

  handleModalOpen = () => {
    this.setState({
      modal: true,
      loading: true
    });
  };

  handleModalClose = () => {
    this.setState({
      modal: false,
      loading: false,
      id: "",
      label: ""
    });
  };

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({[name]: value});
    }
  };

  render () {
    const {
      label,
      defaultSorted,
      defaultPageSize,
      loading,
      filterable,
      previousText,
      nextText,
      loadingText,
      noDataText,
      pageText,
      ofText,
      rowsText,
      open,
      modal,
      setting
    } = this.state;
    const columns = [
      {
        columns: [
          {
            Header: "id",
            accessor: "id",
            show: false
          },
          {
            Header: "active",
            accessor: "active",
            show: false
          },
          {
            Header: "Label",
            accessor: "label",
            filterMethod: (fill, rows) => matchSorter(rows, fill.value, {keys: ["label"]}),
            filterAll: true
          }
        ]
      },
      {
        columns: [
          {
            Cell: (row) => (
              <div>
                <Button
                  color={row.original.active ? "blue" : "grey"}
                  icon={row.original.active ? "toggle on" : "toggle off"}
                  onClick={this.activeRow.bind(
                    this,
                    row.original.id,
                    row.original.active
                  )}
                  size="mini"
                />
                <Button
                  color="green"
                  icon="edit"
                  onClick={this.editeRow.bind(
                    this,
                    row.original.id,
                    row.original.label
                  )}
                  size="mini"
                />
                <Button
                  color="red"
                  icon="remove"
                  onClick={this.open.bind(this, row.original.id)}
                  size="mini"
                />
                <Confirm
                  cancelButton="Annuler"
                  confirmButton="Confirmer"
                  content="Voulez vous vraiment supprimer ?"
                  onCancel={this.handleClose}
                  onConfirm={this.handleDelete}
                  open={open}
                />
              </div>
            )
          }
        ]
      }
    ];
    return (
      <div style={this.props.contentStyle}>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Button
                animated
                color="facebook"
                onClick={this.handleModalOpen}
              >
                <Button.Content visible>Ajouter</Button.Content>
                <Button.Content hidden>
                  <Icon name="plus" />
                </Button.Content>
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <ReactTable
                className="-striped -highlight"
                columns={columns}
                data={setting}
                defaultPageSize={defaultPageSize}
                defaultSorted={defaultSorted}
                filterable={filterable}
                loading={loading}
                loadingText={loadingText}
                nextText={nextText}
                noDataText={noDataText}
                ofText={ofText}
                pageText={pageText}
                previousText={previousText}
                rowsText={rowsText}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Modal
          basic
          onClose={() => {
            this.handleModalClose();
          }}
          open={modal}
        >
          <Modal.Header>
            {!isNumber(this.state.id)
              ? "Traitement d'insertion"
              : "Traitement de modification"}
          </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Label"
                  name="label"
                  onChange={this.handleChange}
                  value={label}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="green"
              inverted
              onClick={this.handleSubmit}
            >
              <Icon name="save" /> Save
            </Button>
            <Button
              color="red"
              inverted
              onClick={this.handleModalClose}
            >
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({settings: state.settings});
Generator.propTypes = {
  settings: PropTypes.object.isRequired,
  contentStyle: PropTypes.object.isRequired,
  saveSetting: PropTypes.func.isRequired,
  deleteSetting: PropTypes.func.isRequired,
  labelSetting: PropTypes.func.isRequired,
  activeSetting: PropTypes.func.isRequired,
  notifyAdd: PropTypes.func.isRequired,
  notifyEdit: PropTypes.func.isRequired,
  notifyDelete: PropTypes.func.isRequired,
  notifyError: PropTypes.func.isRequired,
  settingOf: PropTypes.string.isRequired
};
export default connect(
  mapStateToProps,
  {
    saveSetting,
    deleteSetting,
    activeSetting,
    labelSetting
  }
)(Generator);
