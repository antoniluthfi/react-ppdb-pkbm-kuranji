import React, { Suspense, useState, useEffect } from 'react'
import {
    Redirect,
    Route,
    Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import axios from 'axios'

// routes config
import adminRoutes from '../routes/administratorRoutes'
import siswaRoutes from '../routes/siswaRoutes'
  
const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

const TheContent = () => {
  const [routes, setRoutes] = useState([]);

    const getCurrentUser = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/user/my/profile`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('ppdb-token')}`
            }
        })
        .then(response => {
            const result = response.data.result;
            if(result.hak_akses === 'administrator') {
                setRoutes(adminRoutes);
            } else if(result.hak_akses === 'siswa') {
                setRoutes(siswaRoutes);
            }
        })
        .catch(error => {
            localStorage.clear();
            window.location.reload(true);
        });
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <main className="c-main">
            <CContainer fluid>
                <Suspense fallback={loading}>
                    <Switch>
                        {routes.map((route, idx) => {
                            return route.component && (
                                <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={props => (
                                    <CFade>
                                    <route.component {...props} />
                                    </CFade>
                                )} />
                            )
                        })}
                        <Redirect from="/" to="/dashboard" />
                    </Switch>
                </Suspense>
            </CContainer>
        </main>
    )
}

export default React.memo(TheContent)
