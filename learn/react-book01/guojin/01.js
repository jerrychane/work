class AnswerMutipleChoiceQuestion extend Component {
    constructor(props) {
        super(props);
        this.state = {
            id: uniqueId('mutiple-choice-'),
            value: props.value
        };
        this.handleChanged = this.handleChanged.bind(this);
    }

    renderChoices() {
        return this.props.choices.map((choice, i) => {
            return (
                <AnswerRadioInput
                    id = {"choice-" + i}
                    name = {this.state.id}
                    label = {choice}
                    value = {choice}
                    checked = {this.state.value == choice}
                    onChange = {this.handleChanged}
                    />
            );
        });
    }

    handleChanged(value) {
        this.setState({ value: value });
        this.props.onCompleted(value);
    }

    render() {
        return (
            <div className="form-group">
                <label className="survey-item-label" htmlFor={this.state.id}>
                    {this.props.label}
                </label>
                <div className="survey-item-content">
                 {this.renderChoices()}
                </div>
         </div>);
    }
}

AnswerMutipleChoiceQuestion.propTypes = {
    value: React.PropTypes.string,
    choices: React.PropTypes.array.isRequired,
    onCompleted: React.PropTypes.func.isRequired
};

class AnswerRadioInput extends Component {
    constructor(props) {
        super(props)
        this.handleChanged = this.handleChanged.bind(this);
    }

    handleChanged(e) {
        var checked = e.target.checked;
        this.setState({ checked: checked });
        if (checked) {
            this.props.onChanged(this.props.value);
        }
    }

    render() {
        return (
            <div className="radio">
                <label htmlFor={this.state.id}>
                    <input type="radio" onChange={this.handleChanged} />
                    {this.props.label}
                </label>
            </div>
        );
    }
}
AnswerRadioInput.propTypes: {
    onChanged: React.PropTypes.func.isRequired
};