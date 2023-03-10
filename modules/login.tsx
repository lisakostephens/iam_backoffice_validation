import { LoginProps } from "../infrastructure/interfaces/pages/login";
import { Show } from "../src/components/Show";

export const LoginContent = (props: LoginProps) => (
    <div className='login content'>
        <div className='login-form'>
            <h1> IAM </h1>

            <label> E-mail </label>
            <input 
                type="text" value={ props.email } 
                onBlur={ (e) => props.validateEmail(e.target.value) } 
                onChange={ (e) => props.onUpdateEmail(e.target.value) }
            />
            <Show when={ props.isEmailError }> 
                <small> Type a valid e-mail </small> 
            </Show>

            <label> Password </label>
            <input type="password" 
                value={ props.password } 
                onBlur={ (e) => props.validatePassword(e.target.value) } 
                onChange={ (e) => props.onUpdatePassword(e.target.value) }
            />
            <Show when={ props.isPasswordError }>
                <small> Password must be at least 3 digits long </small>
            </Show>

            <button onClick={ () => props.onLogin() }> Entrar </button>
            <Show when={ props.isLoginError }>
                <small className='text-center'> Incorrect email or password </small>
            </Show>
        </div>
    </div>
)