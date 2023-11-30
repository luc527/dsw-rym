import { Link } from 'react-router-dom';
import SearchArtists from "./search";

export default function Artists() {
    return (
        <div>
            Here are the artists
            <Link to='new'>New artist</Link>
            <SearchArtists />
        </div>
    )
}