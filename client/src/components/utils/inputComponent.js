import React , {Component} from 'react';
import { Input , Grid, Button } from 'semantic-ui-react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class InputComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            inputFields : {}
        }
    }
    

    onChangeEditor(dataKey, event, editor){
        const data = editor.getData();
        // console.log( { dataKey, event, editor, data  } );
        this.setState({
            inputFields : {
                ...this.state.inputFields,
                [dataKey] : data
            }
        })
    }
    onChangeStringType = (e , data, typekey) => {
        this.setState({
            inputFields : {
                ...this.state.inputFields,
                [e.target.name] : data.value
            }
        })
    }
    onSubmit(){
        this.props.click(this.state.inputFields)
    }
    render(){
        return <Grid stackable>
        {
            this.props.data.map((val, i) => {
                if(val.type === 'stringtype'){
                    return <Grid.Row>
                        <Grid.Column width={3}>
                            <p>{val.name}</p>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Input 
                                onChange={this.onChangeStringType} 
                                placeholder={val.name} 
                                name={val.key}
                            />
                        </Grid.Column>
                    </Grid.Row>
                } else if(val.type === 'editor'){
                    return <Grid.Row>
                        <Grid.Column width={3}>
                            <p>{val.name}</p>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <CKEditor
                                editor={ ClassicEditor }
                                data={this.state.inputFields[val.key]}
                                onInit={ editor => {
                                    console.log( 'Editor is ready to use!', editor );
                                } }
                                onChange={ this.onChangeEditor.bind(this, val.key) }
                            />
                        </Grid.Column>
                    </Grid.Row>
                } else{
                    return <Grid.Row>
                        <Grid.Column width={3}>
                            <p>{val.name}</p>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Input placeholder='Search...' />
                        </Grid.Column>
                    </Grid.Row>
                }
            })
        }
        <Grid.Row>
            <Button primary onClick={this.onSubmit.bind(this)}>Submit</Button>
        </Grid.Row>
    </Grid>
    }
}

export default InputComponent;