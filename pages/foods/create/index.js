//import hook useState
import { useState } from 'react';

//import router
import Router from 'next/router';

//import layout
import Layout from '../../../components/layouts';

//import axios
import axios from "axios";

function PostCreate() {
    
    const [title, setTitle] = useState('');
    const [kode, setKode] = useState('');

    //state validation
    const [validation, setValidation] = useState({});

    //method "storePost"
    const storePost = async (e) => {
        e.preventDefault();

        //define formData
        const formData = new FormData();

        formData.append('nama', title);
        formData.append('kode', kode);
        
        //send data to server
        await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/products`, formData)
        .then((response) => {
            //redirect
            Router.push('/foods')

        })
        .catch((error) => {
            console.log(error);
            //assign validation on state
            setValidation(error.response.data);
        })
        
    };

    return (
        <Layout>
            <div className="container" style={{ marginTop: '80px' }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <form onSubmit={ storePost }>

                                    <div className="form-group mb-3">
                                        <label className="form-label fw-bold">TITLE</label>
                                        <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan Title" />
                                    </div>
                                    {
                                        validation.title &&
                                            <div className="alert alert-danger">
                                                {validation.title}
                                            </div>
                                    }
                                    
                                    <div className="form-group mb-3">
                                        <label className="form-label fw-bold">TITLE</label>
                                        <input className="form-control" type="text" value={kode} onChange={(e) => setKode(e.target.value)} placeholder="Masukkan kode" />
                                    </div>
                                    {
                                        validation.kode &&
                                            <div className="alert alert-danger">
                                                {validation.kode}
                                            </div>
                                    }

                                    <button className="btn btn-primary border-0 shadow-sm" type="submit">
                                        SIMPAN
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );

}

export default PostCreate