// Addons
import {values} from "lodash";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import {ToastContainer} from "react-toastify";
import {notifyDelete} from "../../services/notify";
// React
import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
// Semantic
import {Button, Icon, Header, Divider, Statistic, Image, Breadcrumb, Segment, Confirm} from "semantic-ui-react";
// Actions
import {deletePatient} from "../../actions/patientsAction";
// Images
import people from "../../images/people.png";
// Begin
class PatientsList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      defaultPageSize: 5,
      page: "Liste des patients",
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
      patients: []
    };
  }

  componentDidMount () {
    const {patients} = this.props;
    this.handleLoadPatients(patients);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.patients !== this.props.patients) {
      this.handleLoadPatients(nextProps.patients);
    }
  }

  handleLoadPatients = (patients) => {
    this.setState({patients: values(patients)});
  };

  handleDelete = () => {
    const {deleteID} = this.state;
    this.props.deletePatient(deleteID);
    this.setState({open: false});
    notifyDelete("🚀 La suppression a été effectué.", "top-right");
  };

  handleToHome = () => {
    this.props.history.push("/");
  };

  editRow = (rowID) => {
    this.props.history.push(`/patient/event/${rowID}`);
  };

  handleAdd = () => {
    this.props.history.push("/patient/event");
  };

  handleShow = (id) => {
    this.props.history.push(`/patient/show/${id}`);
  };

  open = (rowID) => {
    this.setState({
      open: true,
      deleteID: rowID
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render () {
    const {
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
      patients,
      page,
      open
    } = this.state;

    const columns = [
      {
        columns: [
          {
            Cell: (row) => (
              <div>
                <Button
                  color="red"
                  icon="remove"
                  onClick={this.open.bind(this, row.original.id)}
                  size="mini"
                />
                <Button
                  color="green"
                  icon="edit"
                  onClick={this.editRow.bind(this, row.original.id)}
                  size="mini"
                />
                <Button
                  color="grey"
                  icon="zoom-in"
                  onClick={this.handleShow.bind(this, row.original.id)}
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
            ),
            minWidth: 120,
            filterable: false
          }
        ]
      },
      {
        columns: [
          {
            Header: "CIN",
            accessor: "cin",
            minWidth: 80,
            filterMethod: (fill, rows) => matchSorter(rows, fill.value, {keys: ["cin"]}),
            filterAll: true
          },
          {
            Header: "Nom",
            accessor: "nom",
            minWidth: 120,
            filterMethod: (fill, rows) => matchSorter(rows, fill.value, {keys: ["nom"]}),
            filterAll: true
          },
          {
            Header: "Prénom",
            accessor: "prenom",
            minWidth: 120,
            filterMethod: (fill, rows) => matchSorter(rows, fill.value, {keys: ["prenom"]}),
            filterAll: true
          },
          {
            Header: "Date",
            accessor: "datenaissance",
            minWidth: 120,
            filterMethod: (fill, rows) => matchSorter(rows, fill.value, {keys: ["datenaissance"]}),
            filterAll: true
          },
          {
            Header: "Sexe",
            accessor: "sexe",
            minWidth: 120,
            filterMethod: (fill, rows) => matchSorter(rows, fill.value, {keys: ["sexe"]}),
            filterAll: true
          },
          {
            Header: "Tél",
            accessor: "telport",
            minWidth: 120,
            filterMethod: (fill, rows) => matchSorter(rows, fill.value, {keys: ["telport"]}),
            filterAll: true
          }
        ]
      }
    ];
    return (
      <div>
        <ToastContainer />
        <Header
          as="h2"
          icon
          textAlign="left"
        >
          <Header.Content>{page}</Header.Content>
        </Header>
        <Button
          icon
          onClick={this.handleToHome}
        >
          <Icon name="reply" />
        </Button>
        <Breadcrumb>
          <Breadcrumb.Section
            link
            onClick={this.handleToHome}
          >
            Home
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section>Patients</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right arrow" />
          <Breadcrumb.Section active>{page}</Breadcrumb.Section>
        </Breadcrumb>
        <Segment>
          <Button
            animated="vertical"
            color="facebook"
            onClick={this.handleAdd}
          >
            <Button.Content hidden>Ajouter</Button.Content>
            <Button.Content visible>
              <Icon name="add" />
            </Button.Content>
          </Button>
          <Button
            animated="vertical"
            color="orange"
          >
            <Button.Content hidden>Excel</Button.Content>
            <Button.Content visible>
              <Icon name="file excel" />
            </Button.Content>
          </Button>
          <Button
            animated="vertical"
            color="violet"
          >
            <Button.Content hidden>PDF</Button.Content>
            <Button.Content visible>
              <Icon name="file pdf" />
            </Button.Content>
          </Button>
          <Header
            as="h5"
            floated="right"
          >
            <Image
              circular
              size="tiny"
              src={people}
            />
            <Statistic color="grey">
              <Statistic.Value>{patients.length}</Statistic.Value>
              <Statistic.Label>Patients</Statistic.Label>
            </Statistic>
          </Header>

          <Divider clearing />
          <ReactTable
            className="-striped -highlight"
            columns={columns}
            data={patients}
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
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({patients: state.patients});
PatientsList.propTypes = {
  patients: PropTypes.object,
  history: PropTypes.object,
  deletePatient: PropTypes.func.isRequired
};
export default withRouter(connect(
  mapStateToProps,
  {deletePatient}
)(PatientsList));
