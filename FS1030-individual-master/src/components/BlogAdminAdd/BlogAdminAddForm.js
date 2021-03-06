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

 


function BlogAdminAddForm() {
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
              url: "http://localhost:3001/blog/add" ,
              dataType : "json",
              contentType : "application/json", 
              data: JSON.stringify(values),
              success: function (res) {
                if(res.status === 0)
                {
                    alert('success');
                }
                else
                {
                    alert(res.message)
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
        <h1>New Article</h1>
        <CustomTextInput label="titlee" name="title" type="text" placeholder="Please enter title" />
        <CustomTextInput label="contente" name="content" placeholder="Please enter content" />
        <button type="submit">{props.isSubmitting ? 'Loading' : 'Submit'}</button>
      </Form>

    )}
    </Formik>
   
  );
}

export default BlogAdminAddForm;
