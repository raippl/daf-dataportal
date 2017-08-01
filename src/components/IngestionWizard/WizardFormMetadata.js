import React from 'react'
import { Field, FieldArray, reduxForm, formValueSelector,  change  } from 'redux-form'
import validate from './validate'
import {processInputFileMetadata} from './avroschema.js'
import Dropzone from 'react-dropzone'
import TestSelect2 from './TestSelect2';
import { connect } from 'react-redux';



const calcDataFields = (fields, files) =>
     processInputFileMetadata(files, (resData)=>{
        console.log(JSON.stringify(resData))
        resData.names.map((item, index) => {
           console.log(item)
           fields.push({nome : item, tipo : resData.props[index].type, concetto : '', 
            desc : '', required : 0, field_type : '' , cat : '', tag : '', 
            constr : [{"`type`": "","param": ""}], semantics : { id: '',context: '' }})
        } , 
          fields.push({nome : 'file', tipo : files[0]})
        )
     })



 const renderDropzoneInput = ({fields, input, meta : {touched, error} }) => 
    <div>
      <div className="form-group">
        <Dropzone
          name="input"
          multiple={false}
          maxSize={52428800}
          onDrop={( filesToUpload, e ) => {
            calcDataFields(fields, filesToUpload);
            //dispatch(change('wizard', 'title', 'title'))
            }
          }>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
      {touched &&
        error &&
        <span>
          {error}
        </span>}       

      {fields.map((test, index) => 
      (index != 0) &&
 
      <div className="form-group">
      <div className="card">
        <div className="card-header">
          <strong>Colonna #{index}</strong>
        </div>
        <div className="card-block">
        <Field
          name={`${test}.nome`}
          type="text"
          component={renderField}
          label="Nome Campo"
          value={`${test}.nome`}
        />
        <Field
          name={`${test}.tipo`}
          type="text"
          component={renderField}
          label="Tipo"
          value={`${test}.tipo`}
        />
        <Field
          name={`${test}.concetto`}
          type="text"
          component={TestSelect2}
          label="Concetto"
          value={`${test}.concetto`}
        />
        <hr class="my-4"/>
        <h6>
        Metadata  Colonna #{index}
        </h6>

        <Field
          name={`${test}.desc`}
          type="text"
          component={renderFieldMeta}
          label="Descrizione"
          value={`${test}.desc`}
        />
        <Field
          name={`${test}.required`}
          type="text"
          component={renderYesNoSelector}
          label="Obbligatorio"
          value={`${test}.required`}
        />
        <Field
          name={`${test}.field_type`}
          type="text"
          component={renderFieldType}
          label="Tipo Colonna"
          value={`${test}.field_type`}
        />
        <Field
          name={`${test}.cat`}
          type="text"
          component={renderFieldMeta}
          label="Categoria"
          value={`${test}.cat`}
        />
        <div className="col-md-9 offset-md-9">
          <button type="button" onClick={() => fields.remove(index)} className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
            Rimuovi
          </button>
        </div>
      </div>
      </div>
      </div>
    )}
    </div>
     
//  var metadata = { "desc": "", "required": 0, "field_type": "","cat": "","tag": "","constr": [{"`type`": "","param": ""}],"semantics": {"id": "","context": ""}}
const themes = [
{'val' : 'AGRI', 'name' : 'AGRICOLTURA'},{'val' : 'EDUC', 'name' : 'EDUCAZIONE'},
{'val' : 'ECON', 'name' : 'ECONOMIA'},
{'val' : 'ENVI', 'name' : 'AMBIENTE'},{'val' : 'HEAL', 'name' : 'SANITA'},
{'val' : 'INTR', 'name' : 'INTERNAZIONALE'},{'val' : 'JUST', 'name' : 'GIUSTIZIA'},
{'val' : 'SOCI', 'name' : 'REGIONE'},{'val' : 'TECH', 'name' : 'TECNOLOGIA'},
{'val' : 'TRAN', 'name' : 'TRASPORTO'}]

const renderThemes = ({ input, meta: { touched, error } }) => (
    <div className="form-group row">
      <label className="col-md-3 form-control-label">Categoria</label>
      <div className="col-md-9">
         <div className="form-group">
          <select className="form-control" {...input}>
            <option value="ECON"  key='theme' defaultValue>ECONOMIA</option>
            {themes.map(value => <option value={value.val} key={value.val}>{value.name}</option>)}
          </select>
        </div>
        {touched && error && <span>{error}</span>}
      </div>
   </div>
);

const renderField = ({ input, label, type, value = '', meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-md-3 form-control-label">{label}</label>
   <div className="col-md-9">
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

  const renderFieldMeta = ({ input, label, type, value = '', meta: { touched, error } }) => (
    <div>
    <label className="col-md-2 form-control-label">{label}</label>
   <div className="col-md-4">
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderYesNoSelector = ({ input, meta: { touched, error } }) => (
    <div>
    <label className="col-md-2 form-control-label">Obbligatorio?</label>
   <div className="col-md-4">
    <select className="form-control" {...input}>
      <option value="0" defaultValue key='false'>No</option>
      <option value="1" key="1">Yes</option>
    </select>
    {touched && error && <span>{error}</span>}
</div>
  </div>
);

const renderFieldType = ({ input, meta: { touched, error } }) => (
    <div>
    <label className="col-md-2 form-control-label">Tipo Colonna</label>
   <div className="col-md-4">
    <select className="form-control" {...input}>
      <option value="" defaultValue key=''></option>
      <option value="dimension" key='dimension'>Dimension</option>
      <option value="numerical" key="numerical">Numerical Value</option>
      <option value="textual" key="textual">Textual Value</option>
    </select>
    {touched && error && <span>{error}</span>}
</div>
  </div>
);

/*const renderHobbies = ({ fields, meta: { error } }) =>
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Hobby
      </button>
    </li>
    {fields.map((hobby, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`Hobby #${index + 1}`}
        />
      </li>
    )}
    {error &&
      <li className="error">
        {error}
      </li>}
  </ul> */


/*
const renderMembers = ({ fields, meta: { error, submitFailed } }) =>
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Member
      </button>
      {submitFailed &&
        error &&
        <span>
          {error}
        </span>}
    </li>
    {fields.map((member, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        />
        <h4>
          Field #{index + 1}
        </h4>
        <Field
          name={`${member}.nome`}
          type="text"
          component={renderField}
          label="Nome Campo"
        />
        <Field
          name={`${member}.tipo`}
          type="text"
          component={renderField}
          label="Tipo"
        />
       <FieldArray name={`${member}.hobbies`} component={renderHobbies} />
      </li>
    )}
  </ul> */

  /*      <li>
        <label htmlFor="ds_datafile">Add File</label>
            <input className="form-control" type="file" id="ds_datafile" accept=".csv, .txt, .json, .avro" />
            <input type="button" value="Calc Schema" onClick={() => calcDataFields(fields)}/>
        </li> */

const addMetadataFromFile = ({ fields, meta: { error, submitFailed } }) =>   
 <ul>
       <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Member
      </button>
      {submitFailed &&
        error &&
        <span>
          {error}
        </span>}
    </li>

    {fields.map((test, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Member"

          onClick={() => fields.remove(index)}
        />
        <h4>
          Member #{index + 1}
        </h4>
        <Field
          name={`${test}.nome`}
          type="text"
          component={renderField}
          label="Nome Campo"
          value={`${test}.nome`}
        />
        <Field
          name={`${test}.tipo`}
          type="text"
          component={renderField}
          label="Tipo"
          value={`${test}.tipo`}
        />
      </li>
    )}
  </ul>

//      <FieldArray name="tests" component={addMetadataFromFile}/>
/*      <Field
        name="namespace"
        type="text"
        component={renderField}
        label="namespace"
      />
      <Field
        name="name"
        type="text"
        component={renderField}
        label="name"
      />
      <Field
        name="aliases"
        type="text"
        component={renderField}
        label="aliases"
      />
  */

let WizardFormMetadata = props => {
  const { handleSubmit, previousPage, pristine, submitting, reset, title } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group row">
      <div className="col-md-6">
        <label htmlFor='tests'>Carica il file max 50MB</label>
          <FieldArray
            name="tests"
            component={renderDropzoneInput}
            title={title}
          />
    </div>
    <div className="col-md-6">
      <Field
        name="title"
        type="text"
        component={renderField}
        label="Title"
      />
      <Field
        name="notes"
        type="text"
        component={renderField}
        label="Description"
      />
      <Field
        name="theme"
        type="text"
        component={renderThemes}
        label="Themes"
      />
      <Field
        name="license_title"
        type="text"
        component={renderField}
        label="License"
      />
      </div>
      <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group mr-2" role="group" aria-label="First group">
          <button type="button" className="btn btn-primary" onClick={previousPage}>Previous</button>
        </div>
        <div className="btn-group mr-2" role="group" aria-label="Second group">
          <button type="submit" className="btn btn-primary">Next</button>
        </div>
        <div className="btn-group" role="group" aria-label="Third group">
          <button type="button" className="btn btn-primary" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </div>
   </div>
    </form>
  )
}

/*
     
      <div>
        <button type="submit" className="next">Next</button>
         <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
      */



// <FieldArray name="members" component={renderMembers} />


//const selector = formValueSelector('wizard') // <-- same as form name
//WizardFormMetadata = connect(state => {
  // can select values individually
//const title = (title) => change('wizard', 'title', title)
// return {
//    title
//  }
//})(WizardFormMetadata)


export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardFormMetadata);
