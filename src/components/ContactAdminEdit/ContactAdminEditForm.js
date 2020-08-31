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



const CustomCheckbox = ({children, ...props}) =>{
  const [field, meta] = useField(props, 'checkbox');

  return (
    <>
        <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}

      </>
  )
}



const CustomSelect = ({label, ...props}) =>{
  const [field, meta] = useField(props);

  return (
    <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}

      </>
  )
}


class ContactAdminEditForm extends React.Component {
 
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
          name: '',
          email: '',
          acceptedTerms: false,
          specialPower: '',
        }}

        validationSchema={Yup.object({
           name: Yup.string()
              .min(3, 'At least 3 Char Please')
              .max(15, '15 chart or less Please')
              .required('Required'),
           
           email: Yup.string()
               .email('Invalid email')
               .required('Required'),
           
           acceptedTerms: Yup.boolean()
              .required('Required')
              .oneOf([true], 'You must accept the terms'),

           
           special: Yup.string()
              .oneOf(['bear', 'wolf', 'tiger', 'eagle'], 'Invalide Special Power')
              .required('Required'),

        })}

        onSubmit={(values, {setSubmitting,resetForm}) => {
           
            $.ajax({
              type: "post",
              url: "http://localhost:3001/contactlog/update" ,
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
        <h1>Edit</h1>
        <CustomTextInput label="Name" name="name" type="text" placeholder="Your Name" />
        <CustomTextInput label="Email" name="email" type="email" placeholder="anyone@123.com" />
        <CustomSelect label="Special Power" name="special">
          <option value="">Select a Special Power</option>
          <option value="bear">bear</option>
          <option value="wolf">wolf</option>
          <option value="tiger">tiger</option>
          <option value="eagle">eagle</option>
        </CustomSelect>
        <CustomCheckbox name="acceptedTerms">
           I accept the terms
        </CustomCheckbox>
        <button type="submit">{props.isSubmitting ? 'Loading' : 'Submit'}</button>
      </Form>

    )}
    </Formik>
   
  )
  }

}

 
export default ContactAdminEditForm;
