import Layout from '../components/Layout';
import SigninComponent from '../components/auth/SigninComponent'
import Link from 'next/link'

const Signup = () => {
    return (
        <Layout>
            <div className="container">
                <h2 className="text-center pt-4 pb-4">Signin</h2>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <SigninComponent />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Signup;