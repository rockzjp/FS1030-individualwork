import React from 'react';
import  './Styles.scss';
import { Formik, useField, Form } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';

const CustomTextInput = ({label, ...props}) =>{
      const [field, meta] = useField(props);
      return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
              <div className="error">{meta.error}</div>
            ) : null}

          </>
      )
}

 
class BlogAdminEditForm extends React.Component {
 
 constructor(props) {
      super(props);
      this.state = {classes: {}, rows: [] };
       
  }

  componentDidMount() {
    
    this.id = this.getQueryVariable( 'id' )

  }

 getQueryVariable(variable) {
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
   }
   return(false);
}

  render() {
    
  return (
   
    <Formik
        initialValues={{
          title: '',
          content: ''
        }}

        validationSchema={Yup.object({
           title: Yup.string()
            .required('Required'),

            content: Yup.string()
            .required('Required'),
             
        })}

        onSubmit={(values, {setSubmitting,resetForm}) => {
           
            $.ajax({
              type: "post",
              url: "http://localhost:3600/portfolio/update" ,
              dataType : "json",
              contentType : "application/json", 
              data: JSON.stringify({type:"update",id:this.id,"info":values}),
              success: function (res) {
                if(res.returnCode === 0)
                {
                    alert('submit success');
                }
                else
                {
                    alert(res.reutrnMsg)
                }
 
                resetForm();
                setSubmitting(false);

              },
              error:function(err)
              {
                alert(err);
              }
            })
  
        }}
    
    
    >
    

    {props => (
      <Form>
        <h1>Edit Article</h1>
        <CustomTextInput label="title" name="title" type="text" placeholder="Please enter title" />
        <CustomTextInput label="content" name="content" placeholder="Please enter content" />
        <button type="submit">{props.isSubmitting ? 'Loading' : 'Submit'}</button>
      </Form>

    )}
    </Formik>
   
  );
  }

}
 
export default BlogAdminEditForm;
