import React, { Component } from 'react';

interface Param {
    id: number;
    name: string;
    type: 'string';
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Color {
    name: string;
    hex: string;
  }

interface Model {
    paramValues: ParamValue[];
    colors: Color[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    paramValues: { [key: number]: string };
}

class ParamEditor extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const paramValues: { [key: number]: string } = {};
        props.model.paramValues.forEach((paramValue) => {
            paramValues[paramValue.paramId] = paramValue.value;
        });
        this.state = { paramValues };
    }

    handleParamChange = (paramId: number, value: string) => {
        this.setState((prevState) => ({
            paramValues: {
                ...prevState.paramValues,
                [paramId]: value,
            },
        }));
    };

    getModel = () => {
        const { paramValues } = this.state;
        const { model } = this.props;
        const updatedParamValues: ParamValue[] = Object.entries(paramValues).map(([paramId, value]) => ({
                paramId: parseInt(paramId),
                value,
            }));
            const updatedModel: Model = { ...model, paramValues: updatedParamValues };
            console.log('Updated Model:', updatedModel);
            return updatedModel;
    };

    render() {
        const { params } = this.props;
        const { paramValues } = this.state;

        return (
            <div className="form-container">
                {params.map((param) => (
                    <div key={param.id}>
                        <label>{param.name}</label>
                        <input
                            type="text"
                            value={paramValues[param.id] || ''}
                            onChange={(e) => this.handleParamChange(param.id, e.target.value)}
                        />
                    </div>
                ))}
                <button onClick={this.getModel}>Get Model</button>
            </div>
        );
    }
}

const params: Param[] = [
    { id: 1, name: "Назначение", type: 'string' },
    { id: 2, name: "Длина", type: 'string' }
];

const model: Model = {
    paramValues: [
        { paramId: 1, value: "повседневное" },
        { paramId: 2, value: "макси" }
    ],
    colors: []
};

class App extends Component {
    render() {
        return (
            <div className='param-editor-cnt'>
                <h1>Редактор параметров</h1>
                <ParamEditor params={params} model={model} />
            </div>
        );
    }
}

export default App;
