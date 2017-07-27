import React from 'react';
import WizardForm from '../../components/IngestionWizard/WizardForm'
import {getJsonDataschema} from '../../components/IngestionWizard/inputform_reader.js'

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {
      // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 500)
  })

class WizardContainer extends React.Component {
  render() {
    return (
       <WizardForm onSubmit={showResults} />
    );
  }
}

export default WizardContainer;
