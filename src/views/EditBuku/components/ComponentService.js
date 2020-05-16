import axios from 'axios';
import { Variable } from 'components'

const EDITBUKU_API_URL = `${Variable}/buku/edit/`;

class ComponentService {
	editBuku(bukuId) {
		return axios.get(`${EDITBUKU_API_URL}` + bukuId)
	}
	editBukuPost(bukuId, buku){
		return axios.post(`${EDITBUKU_API_URL}` + bukuId, buku)
	}
}

export default new ComponentService()