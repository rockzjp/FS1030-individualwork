import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import  Container  from '@material-ui/core/Container';
import  Grid  from '@material-ui/core/Grid';
import  Card  from '@material-ui/core/Card';
import  CardActionArea  from '@material-ui/core/CardActionArea';
import  CardMedia  from '@material-ui/core/CardMedia';
import  CardContent  from '@material-ui/core/CardContent';

import $ from 'jquery';


const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff"
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1593068120923-19050f52c177?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
        },
  
  blogContainer: {
    paddingTop: theme.spacing(3)
  },

  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3)
  },

  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240
  }
}));

 
class ContactListContent extends React.Component {
 constructor(props) {
      super(props);
      this.state = {classes: {} , rows: [] };
  }
 
  componentDidMount() {
 
    this.setState({
        classes: useStyles() 
      });

    this.serverRequest = $.get(this.props.source, function (result) {
      var lastGist = result[0];
      this.setState({
        rows: []
      });
    }.bind(this));
  }

  render() {
    return (
        <>
         <div className="App">
      <Container maxWidth="lg" className={this.state.classes.blogContainer}>
             <Typography variant="h4" className={this.state.classes.blogTitle}>
                Message List
              </Typography>
              <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">ID</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">SpecialPower</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
      </Container>
    </div>
          </>
      )

  }
}

 

export default ContactListContent;
