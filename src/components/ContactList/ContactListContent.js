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
      this.state = {classes: {}, rows: [] };
  }
 
 
  update(param,event){
    console.log(param)
    console.log(event)
    window.location = '/contact_list_edit?id=' + param.id;
  }
  
  delete(param,event){

      var _this = this

    $.ajax({
        type: "POST",
        url: "http://localhost:3001/contactlog/update",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({type:"delete",id:param.id}),
        dataType: "json",
        success: function (res) {
            alert('delete success');

            _this.updateList()
        },
        error: function (message) { 
        }
    });
  }
 
  componentDidMount() {
      this.updateList()
  }

  updateList()
  {
      
      var _this = this

      $.post('http://localhost:3001/contactlog/search',{},function(res){

        console.log(res)

      _this.setState({
          rows: res.contactlogInfo
        });
      })
  }
 

  componentWillUnmount() { 
  }

  render() {
    
  return (
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
                      <TableCell align="right">Edit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell align="right">{row.id}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.special}</TableCell>
                        <TableCell align="right"><a onClick={this.update.bind(this,row)} >edit</a>   <a  onClick={this.delete.bind(this,row)}  >delete</a> </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
      </Container>
    </div>
  );
  }
}

 

export default ContactListContent;
