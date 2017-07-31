import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  loadDatasets,
  unloadDatasets,
  datasetDetail
} from '../../actions'
import AutocompleteDataset from '../../components/Autocomplete/AutocompleteDataset.js'

class Dataset extends Component {
  constructor(props) {
    super(props)
    this.handleLoadDatasetClick = this.handleLoadDatasetClick.bind(this)
    this.handleUnloadDatasetClick = this.handleUnloadDatasetClick.bind(this)
    this.handleLoadDatasetDetailClick = this.handleLoadDatasetDetailClick.bind(this)
  }

  /*
  componentWillMount(){
        console.log('componentWillMount');
        console.log('1: ' + this.props.match.params.query);
        this.searchDataset(this.props.match.params.query);
  }  
*/
  searchDataset(query){
    const { dispatch, selectDataset } = this.props
    dispatch(loadDatasets(query))
  }    

  //Action creators don't dispatch anything to the store; 
  //instead they return action object that a 'central dispatch' uses (action.js) 
  handleLoadDatasetClick(e) {
    console.log('handleLoadDatasetClick');
    console.log('querystring: ' + this.refs.auto.state.value );
    var query = this.refs.auto.state.value;
    e.preventDefault()
    const { dispatch, selectDataset } = this.props
    dispatch(loadDatasets(query))
  }

  handleUnloadDatasetClick(e) {
    console.log('handleUnloadDatasetClick');
    e.preventDefault()
    const { dispatch, selectDataset } = this.props
    dispatch(unloadDatasets())
  }

  handleLoadDatasetDetailClick(name, e){
    console.log('handleLoadDatasetDetailClick ' + name);
    e.preventDefault()
    const { dispatch, selectDataset } = this.props
    dispatch(datasetDetail(name))
  }

  renderDataset(){
    console.log('renderDataset');
    this.searchDataset(this.props.match.params.query);
  }

  renderDatasetList(datasets, ope){
    console.log('ope: ' + ope)
    if (ope == 'RECEIVE_DATASETS')
      return datasets.map(dataset => {
          return(
          <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" onClick={this.handleLoadDatasetDetailClick.bind(this, dataset.name)}>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{dataset.resources[0].name}</h5>
                <small>{dataset.approval_status}</small>
              </div>
              <p className="mb-1">{dataset.resources[0].description}</p>
              <small><strong>Pubblicato da: </strong>{dataset.organization.title}</small><br/>
              <small><strong>Data di ultima modifica: </strong>{dataset.organization.created}</small>
            </a>
            <br/>
          </div>
            
          );
      });
  }
  
  /*
   <div className="u-background-grey-10 u-color-grey-50 u-padding-right-xxl u-padding-r-all u-margin-bottom-l">
                <p className="u-padding-r-bottom">
                  <span className="Dot u-background-40"></span>
                  <a className="u-textClean u-textWeight-700 u-text-r-xs u-color-50 u-margin-right-s" href="#">xlsx</a>
                  <span className="Dot u-background-40"></span>
                  <a className="u-textClean u-textWeight-700 u-text-r-xs u-color-50 u-margin-right-s" href="#">shp</a>
                  <span className="Dot u-background-40"></span>
                  <a className="u-textClean u-textWeight-700 u-text-r-xs u-color-50 u-margin-right-s" href="#">wms</a>
                </p>
                <h3 className="u-padding-r-top u-padding-r-bottom">
                  <a className="u-text-h4 u-textClean u-color-black" href=""  onClick={this.handleLoadDatasetDetailClick.bind(this, dataset.name)}>
                  {dataset.resources[0].name}
							    </a>
                </h3>
                <p className="u-lineHeight-l u-text-r-xs u-textSecondary u-padding-r-right  u-padding-r-bottom">
                  {dataset.resources[0].description}
						  </p>
                <p><strong>Pubblicato da: </strong>{dataset.organization.title}</p>
                <p><strong>Data di ultima modifica: </strong>{dataset.organization.created}</p>
              </div>
  */



  renderDatasetSearchResult(datasets, ope){
    console.log('ope: ' + ope)
    if (ope == 'RECEIVE_DATASETS')
    if (datasets && datasets.length >0)
      return( 
          <div>
            <h3>Sono stati trovati 10 dataset</h3>
            {this.renderDatasetList(datasets, ope)}
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
              </ul>
            </nav>
          </div>
        )
    }

    /*
    <div className="u-layout-wide u-layoutCenter u-layout-withGutter u-padding-r-top u-padding-bottom-xxl">
          <div className="Grid Grid--withGutter">
            <div className="Grid-cell u-md-size8of12 u-lg-size8of12 u-padding-right-xl">
              <h2 className=" u-padding-bottom-l">Trovati {datasets.length} Dataset</h2>
              <form className="Form u-text-r-xs u-margin-bottom-l">
                <fieldset className="Form-fieldset">
                  <div className="Form-field Form-field--withPlaceholder Grid u-background-white u-color-grey-30 u-borderRadius-s u-border-all-xxs">
                    <button className="Grid-cell u-sizeFit Icon-search u-color-grey-40 u-text-r-m u-padding-all-s u-textWeight-400">
                    </button>
                    <AutocompleteDataset/>
                    <button type="submit" className="Grid-cell u-sizeFit u-background-60 u-color-white u-textWeight-600 u-padding-r-left u-padding-r-right u-textUppercase u-borderRadius-s" onClick={this.handleLoadDatasetClick}>Esplora</button>
                  </div>
                </fieldset>
              </form>
              {this.renderDatasetList(datasets, ope)}
              <nav role="navigation" aria-label="Navigazione paginata" className="u-layout-prose Grid-cell--center u-text-r-xss u-padding-top-xxl u-padding-bottom-l">
                <ul className="Grid Grid--fit Grid--alignMiddle u-text-r-xxs">
                  <li className="Grid-cell u-textCenter">
                    <a href="#" className="u-color-50 u-textClean u-padding-all-s" title="Pagina precedente">
                      <span className="Icon-chevron-left u-text-r-s" role="presentation"></span>
                      <span className="u-hiddenVisually">Pagina precedente</span>
                    </a>
                  </li>
                  <li className="Grid-cell u-textCenter u-hidden u-md-inlineBlock u-lg-inlineBlock">
                    <a href="/page-1" aria-label="Pagina 1" className="u-padding-all-s u-color-50 u-textClean">
                      <span className="u-text-r-m">1</span>
                    </a>
                  </li>
                  <li className="Grid-cell u-textCenter u-hidden u-md-inlineBlock u-lg-inlineBlock" aria-hidden="true">
                    <span className="u-padding-all-s u-color-50">
                      <span className="u-text-r-m">...</span>
                    </span>
                  </li>
                  <li className="Grid-cell u-textCenter">
                    <span className="u-padding-all-s u-background-50 u-color-white">
                      <span className="u-text-r-s"><span className="u-md-hidden u-lg-hidden">Pagina</span> 11</span>
                    </span>
                  </li>

                  <li className="Grid-cell u-textCenter u-hidden u-md-inlineBlock u-lg-inlineBlock">
                    <a href="#page-12" aria-label="Pagina 12" className="u-padding-all-s u-color-50 u-textClean">
                      <span className="u-text-r-s">12</span>
                    </a>
                  </li>
                  <li className="Grid-cell u-textCenter u-hidden u-md-inlineBlock u-lg-inlineBlock">
                    <a href="#page-13" aria-label="Pagina 13" className="u-padding-all-s u-color-50 u-textClean">
                      <span className="u-text-r-s">13</span>
                    </a>
                  </li>
                  <li className="Grid-cell u-textCenter">
                    <a href="#" className="u-padding-all-s u-color-50 u-textClean" title="Pagina successiva">
                      <span className="Icon-chevron-right u-text-r-s" role="presentation"></span>
                      <span className="u-hiddenVisually">Pagina successiva</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="Grid-cell u-sizeFull u-md-size4of12 u-lg-size4of12">
              <form className="Form u-text-r-xs u-padding-bottom-l">
                <fieldset className="Form-fieldset">
                  <h2 className=" u-padding-bottom-m"><label htmlFor="ordinamento">Ordina risultato</label></h2>

                  <div className="Form-field">

                    <select className="Form-input u-text-r-xs u-borderRadius-m u-padding-top-s u-padding-bottom-s " id="ordinamento" aria-required="true">
                      <option disabled="" defaultValue="">Data dalla più recente</option>
                      <option>Data dalla più lontana</option>
                      <option>Per categoria</option>
                    </select>
                  </div>
                </fieldset>
              </form>
              <h2 className=" u-padding-bottom-l">Filtra categorie</h2>
              <div className="u-sizeFull" id="subnav">
                <ul className="Linklist Linklist--padded u-layout-prose u-text-r-xs">
                  <li><a href="">Perferendis eaque quas ipsa.</a></li>
                  <li><a href="">Quod facere ab.</a></li>
                  <li><a href="">Suscipit perferendis animi voluptas quibusdam qui.</a></li>
                </ul>
              </div>
              <a href="#" title="torna all'inizio del contenuto" className="u-hiddenVisually">torna all'inizio del contenuto</a>
            </div>
          </div>
        </div>
    */
    
    renderDatasetDetail(dataset, ope){
    console.log('ope: ' + ope)
    if(ope == 'RECEIVE_DATASET_DETAIL'){
      if(dataset)
        return(
          <div className="card">
            <div className="card-header">
              Dettaglio
            </div>
            <div className="card-block">
              <h4 className="card-title">{dataset.resources[0].name}</h4>
              <p className="card-text">{dataset.resources[0].description}</p>
              <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group mr-2" role="group" aria-label="First group">
                  <button type="button" className="btn btn-info">JSON</button>
                </div>
                <div className="btn-group mr-2" role="group" aria-label="Second group">
                  <button type="button" className="btn btn-info">CSV</button>
                </div>
                <div className="btn-group" role="group" aria-label="Third group">
                  <button type="button" className="btn btn-info">ZIP</button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  }

  /*
   <div className="u-background-white u-layout-r-withGutter u-posRelative u-zindex-30">
            <div className="u-layout-wide u-layoutCenter u-layout-withGutter u-padding-r-top u-padding-bottom-xxl">
              <div className="Grid Grid--withGutter">
                <div className="Grid-cell u-md-size8of12 u-lg-size8of12 u-padding-right-xl">
                  <h2 className=" u-padding-bottom-l">{dataset.resources[0].name}</h2>
                  <article className="u-padding-r-all u-background-grey-10 u-lineHeight-l u-text-r-xs u-textSecondary u-margin-bottom-l">
                    <p><strong>Titolare del dataset: </strong> {dataset.author}</p>
                    <p><strong>Editore del dataset:</strong> {dataset.author}</p>
                    <p><strong>Autore del dataset:</strong> {dataset.author}</p>
                  </article>
                  <article className="u-padding-r-all u-background-grey-10 u-lineHeight-l u-text-r-xs u-textSecondary u-margin-bottom-l">
                    <h3 className=" u-padding-bottom-l">Descrizione</h3>
                    <p>{dataset.resources[0].description }</p>
                  </article>
                  <article className="u-padding-r-all u-background-grey-10 u-lineHeight-l u-text-r-xs u-textSecondary u-margin-bottom-l">
                    <h3 className=" u-padding-bottom-l">Risorse</h3>
                    <div className="Grid Grid--fit Grid--withGutter ">
                      <div className="Grid-cell u-md-size2of12 u-lg-size2of12 u-layout-matchHeight">
                        <div className="u-background-5 u-sizeFull u-color-black u-margin-bottom-l u-borderRadius-m u-padding-all-s u-textWeight-600">JSON</div>
                      </div>
                      <div className="Grid-cell  u-md-size10of12 u-lg-size10of12 u-layout-matchHeight">
                        <div className=" u-margin-bottom-l u-borderRadius-m u-padding-all-xxs u-lineHeight-xxl"><a href="#" className="u-text-s u-textWeight-600 u-textClean u-color-50">Metadata json</a><br /> Questa risorsa contiene i metadati relativi ai CSV del dataset come da...<br /><br />
                          <a className="u-sizeFit u-background-60 u-color-white u-textWeight-600 u-padding-r-left u-padding-r-right u-margin-top-l u-textUppercase u-borderRadius-s u-textClean" href="#">scarica</a></div>
                      </div>
                    </div>
                    <div className="Grid Grid--fit Grid--withGutter ">
                      <div className="Grid-cell u-md-size2of12 u-lg-size2of12 u-layout-matchHeight">
                        <div className="u-background-10 u-sizeFull u-color-black u-margin-bottom-l u-borderRadius-m u-padding-all-s u-textWeight-600">CSV</div>
                      </div>
                      <div className="Grid-cell  u-md-size10of12 u-lg-size10of12 u-layout-matchHeight">
                        <div className=" u-margin-bottom-l u-borderRadius-m u-padding-all-xxs u-lineHeight-xxl"><a href="#" className="u-text-s u-textWeight-600 u-textClean u-color-50">Metadata csv</a><br /> Questa risorsa contiene i metadati relativi ai CSV del dataset come da... <br /><br />
                          <a className="u-sizeFit u-background-60 u-color-white u-textWeight-600 u-padding-r-left u-padding-r-right u-margin-top-l u-textUppercase u-borderRadius-s u-textClean" href="#">scarica</a></div>
                      </div>
                    </div>
                    <div className="Grid Grid--fit Grid--withGutter ">
                      <div className="Grid-cell u-md-size2of12 u-lg-size2of12 u-layout-matchHeight">
                        <div className="u-background-20 u-sizeFull u-color-black u-margin-bottom-l u-borderRadius-m u-padding-all-s u-textWeight-600">ZIP</div>
                      </div>
                      <div className="Grid-cell  u-md-size10of12 u-lg-size10of12 u-layout-matchHeight">
                        <div className=" u-margin-bottom-l u-borderRadius-m u-padding-all-xxs u-lineHeight-xxl"><a href="#" className="u-text-s u-textWeight-600 u-textClean u-color-50">Metadata zip</a><br /> Questa risorsa contiene i metadati relativi ai CSV del dataset come da...<br /><br />
                          <a className="u-sizeFit u-background-60 u-color-white u-textWeight-600 u-padding-r-left u-padding-r-right u-margin-top-l u-textUppercase u-borderRadius-s u-textClean" href="#">scarica</a></div>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="Grid-cell u-sizeFull u-md-size4of12 u-lg-size4of12">
                  <article className="u-padding-r-all u-background-grey-10 u-lineHeight-l u-text-r-xs u-textSecondary u-margin-bottom-l">
                    <p><strong>Licenza: </strong> Creative Commons Attribution 4.0 International (CC-BY 4.0)</p>
                    <p><strong>Temi del dataset:</strong> </p>
                    <p><strong>Parole chiave del dataset:</strong> <a href="#">assicurazioni</a> <a href="#">autoautomobile</a> <a href="#">autoveicoli</a> <a href="#">circolazione</a> <a href="#">mobilità</a> <a href="#">moto</a> <a href="#">motorizzazione</a> <a href="#">motoveicoli</a> <a href="#">parco circolante</a> <a href="#">revisioni</a> <a href="#">veicoli</a> <a href="#">vettura</a></p>
                    <p><strong>Data di rilascio:</strong> 2017-03-07</p>
                    <p><strong>Identificativo del dataset:</strong> 60a57c60-758c-4bd9-8d87-c286b797c289</p>
                    <p><strong>Data di ultima modifica: </strong> Lunedì 17 Luglio 2017</p>
                    <p><strong>Lingua del dataset: </strong> Italian</p>
                  </article>
                  <article className="u-padding-r-all u-background-grey-10 u-lineHeight-l u-text-r-xs u-textSecondary u-margin-bottom-l">
                    <h3 className=" u-padding-bottom-l">Contatti</h3>
                    <p><strong>Email Contatto: </strong> <a href="#">mail@mail.it</a> </p>
                  </article>
                  <article className="u-padding-r-all u-background-grey-10 u-lineHeight-l u-text-r-xs u-textSecondary u-margin-bottom-l">
                    <h3 className=" u-padding-bottom-l">Catalogo</h3>
                    <p><strong>Home page: </strong> <a href="#">http://dati.mit.gov.it/catalog/dataset</a> </p>
                    <p><strong>URL API: </strong> <a href="#">http://dati.mit.gov.it/catalog/api/3/a...</a> </p>
                  </article>
                  <a href="#" title="torna all'inizio del contenuto" className="u-hiddenVisually">torna all'inizio del contenuto</a>
                </div>
              </div>
            </div>
          </div>
  */

  render() {
    const { datasets, dataset, ope } = this.props
    return (
          <div className="u-textCenter u-padding-r-all u-textCenter">
            {this.renderDatasetSearchResult(datasets, ope)}
            {this.renderDatasetDetail(dataset, ope)}
          </div>
    )
  }
}

//{this.renderDataset()}

Dataset.propTypes = {
  selectDataset: PropTypes.string,
  datasets: PropTypes.array,
  dataset: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  ope: PropTypes.string
}

function mapStateToProps(state) {
  const { isFetching, lastUpdated, dataset,  items: datasets, ope } = state.datasetReducer['obj'] || { isFetching: true, items: [], ope:'' }
  return {datasets, dataset, isFetching, lastUpdated, ope}
}

export default connect(mapStateToProps)(Dataset)