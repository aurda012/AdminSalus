import React, {Component,PropTypes} from 'react'
import {Input,DateTime,Tags,Radio,CheckBox,TextArea,Select,Image,HTML} from './index'
import Config from   '../../config/app';
import Common from '../../common.js'

class Fields extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fields:{},
      arrays:{},
      elements:{}
    };
    this.displayFields=this.displayFields.bind(this);
  }


  getOptions(key){
    var options=Config.adminConfig.optionsForSelect;
    for (var i = 0; i < options.length; i++) {
      if(options[i].key==key){
        return options[i].options;
      }
    }
    return [];
  }

  displayFields(){
    var ft=Config.adminConfig.fieldsTypes; //Our field types
    var currentElementName = this.props.theKey; //Current key, the current element name, example, name, desciption, created_at
    var options=this.getOptions(this.props.theKey) //Options for current key
    var elementClass="";

    //By Default our new element will be Text Input
    var Element=Input;

    //Now go over our fieldsTypes to check if current key belongs to some special field type
    for (var key in ft) {
        // skip loop if the property is from prototype
        if (!ft.hasOwnProperty(key)) continue;


        var obj = ft[key];
        if(obj.indexOf(currentElementName)!=-1){

          //Get the field type by they key used
          switch (key) {
              case "photo":
                  Element = Image;
                  break;
              case "maps":
                  Element = Input;
                  break;
              case "textarea":
                  Element = TextArea;
                  break;
              case "html":
                  Element = HTML;
                  break;
              case "radio":
                  Element = Radio;
                  break;
              case "checkbox":
                  Element = CheckBox;
                  break;
              case "dropdowns":
                  Element = Select;
                  break;
              case "dateTime":
                  {
                    Element = DateTime;
                    elementClass="datetimepicker"
                  }
                  break;
              case "date":
                  {
                    Element = DateTime;
                    elementClass="datepicker"
                  }
                  break;
              case "time":
                  {
                    Element = DateTime;
                    elementClass="timepicker"
                  }
                  break;
          }
        }
    }

    //Now produce the element
    return <Element options={options} updateAction={this.props.updateAction} class={elementClass} theKey={this.props.theKey} value={this.props.value} />
  }

  render() {
    return (
      <div key={this.props.theKey} className="card-content">
        <div className="row">
          <label className="col-sm-3 label-on-left">{Common.capitalizeFirstLetter(this.props.theKey)}</label>
          <div className="col-sm-8">
          {this.displayFields()}
          </div>
          <div className="col-sm-1">
            <a onClick={() => {
  this.props.deleteFieldAction(this.props.theKey)
}} />
          </div>
        </div>
      </div>
    )
  }
}
export default Fields;
