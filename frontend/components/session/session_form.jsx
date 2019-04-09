import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.credentials;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.processForm(this.state)
    }

    update(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        }
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>

                <div hidden={this.props.formType === 'Register' ? null : "hidden"}>
                    <label> FIRST NAME <br />
                        <input type="text" onChange={this.update('first_name')} value={this.state.first_name} />
                    </label>
                </div>

                <div hidden={this.props.formType === 'Register' ? null : "hidden"}>
                    <label> LAST NAME <br />
                        <input type="text" onChange={this.update('last_name')} value={this.state.last_name} />
                    </label>
                </div>

                <input
                    className="session-text-box"
                    type="text" onChange={this.update('email')}
                    value={this.state.email}
                    placeholder="Email"
                />

                <input
                    className="session-text-box"
                    type="password" onChange={this.update('password')}
                    value={this.state.password}
                    placeholder="Password"
                />

                <input type="submit" value={this.props.formType} />

            </form>
        )
    }

}

export default SessionForm;