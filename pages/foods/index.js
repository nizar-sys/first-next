//layout
import Layout from "../../components/layouts";

//import Link
import Link from 'next/link';

//import axios
import axios from "axios";

//router
import { useRouter } from 'next/router';

//fetch with "getServerSideProps"
export async function getServerSideProps() {

    //http request
    const req  = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/products`);
    const res = await req.data;

    return {
      props: {
          posts: res // <-- assign response
      },
    }
  }

function PostIndex(props) {

    //destruct
    const { posts } = props;

    //router
    const router = useRouter();

    //refresh data
    const refreshData = () => {
        router.replace(router.asPath);
    }

    //function "deletePost"
    const deletePost = async (id) => {

        if (confirm("Are you sure?")) {
            //http request
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/products/${id}`);
            //refresh data
            refreshData();
        }

        return false;

    }

    return(
        <Layout>
            <div className="container" style={{ marginTop: '80px' }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card border-0 shadow-sm rounded-3">
                            <div className="card-body">
                                <Link href="/foods/create">
                                    <button className="btn btn-primary border-0 shadow-sm mb-3">TAMBAH</button>
                                </Link>
                                <table className="table table-bordered mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Kode</th>
                                            <th scope="col">Nama</th>
                                            <th scope="col">AKSI</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { posts.reverse().map((post, i) => (
                                        <tr key={ post.id }>
                                            <td>{ i+1 }</td>
                                            <td>{ post.kode }</td>
                                            <td>{ post.nama }</td>
                                            <td className="text-center">
                                                <button onClick={() => deletePost(post.id)} className="btn btn-sm btn-danger border-0 shadow-sm mb-3">DELETE</button>
                                            </td>
                                        </tr>
                                    )) }
                                    </tbody>
                                </table>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PostIndex