import Link from "next/link"
import { getCookie, deleteCookie } from "cookies-next"
import axios from "axios";
import {useRouter} from "next/router"
import { useEffect, useState } from "react"
import { Button } from "@nextui-org/react";


export default function HelloScreen({data}) {
  
    //session or user area
    const route = useRouter()
    const [isUserLog, setIsUserLog] = useState(false)
    const [userData, setUserData] = useState({})

    useEffect(()=>{
        const us = getCookie('dataUser')
        if(us == undefined){
            route.push('/')
        }else{
          const userSession = JSON.parse(us)
          if(userSession.data[0].nama_lengkap != 'ADMIN'){
            axios.post(`/api/get/datauser`, {kode : userSession.data[0].kode_akses})
            .then((e)=>{
              setUserData(e.data.datauser)
              setIsUserLog(true)
            })
          }else route.push('/')
        }
    },[])

    const handleLogout = ()=>{
    deleteCookie('dataUser')
    alert('Anda Berhasil Log out')
    route.push('/')
  }

  return (
    <>       
        <main className='min-w-full min-h-screen bg-slate-100 text-black' >
          {(isUserLog) ? (
            <>
                <div className="w-full h-[60px] max-w-[980px] flex justify-between items-center mx-auto lg:border-b-2 lg:border-gray-700">
                    <div className="w-full flex justify-center">
                        <h2 className="text-xl font-medium">Jaya Buana</h2>
                    </div>
                    <Button
                    auto
                    onClick={handleLogout}
                    >
                      Log out
                    </Button>
                </div>
               <div className="container w-full relative min-h-screen flex gap-5 max-w-[1180px] mx-auto bg-slate-100 mt-5 px-2 ">
                    <div className=" w-full flex flex-col items-center mx-auto gap-4 md:gap-10">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex flex-col items-center">
                            <h1 className="text-base md:text-xl">UJIAN AKHIR SEMESTER GENAP </h1>
                            <h1 className="text-base md:text-xl">TAHUN AJARAN 2022/2023 </h1>
                          </div>
                          <h1 className="text-base md:text-lg">Selamat Datang, {userData[0].nama_lengkap}</h1>
                          <h1 className="text-base md:text-lg">Pastikan Data Diri kamu benar ya !</h1>
                        </div>
                        <div className="w-full flex flex-col items-center gap-5">
                          <div className="w-[75%] text-black bg-slate-200 mx-auto h-fit shadow-md rounded-md p-1 md:w-[380px] ">
                              <div className="flex flex-col items-start gap-3 w-full h-full">
                                  <div className=' w-full flex flex-row justify-start items-center gap-2'>
                                      <p className="w-[25%]">Nama </p>
                                      <p className="w-[75%]">: <span className="font-semibold">{userData[0].nama_lengkap}</span></p>
                                  </div>
                                  <div className='w-full flex flex-row justify-start items-center gap-2'>
                                      <p className="w-[25%]">Kelas </p>
                                      <p className="w-[75%]">: <span className="font-semibold">{userData[0].nama_kelas}</span></p>
                                  </div>
                              </div>
                          </div>
                          <div className="w-[60%] flex flex-col items-center gap-3">
                            <h2>Pilih Mata Pelajaran</h2>
                            <div className="w-full max-w-[480px] flex flex-wrap gap-2 justify-center">
                              {userData?.map((e)=>{
                                return(
                                  <Link href={e.link_ujian} target="_blank" className="w-fit h-[40px] px-2 bg-sky-700 text-white rounded text-base flex justify-center items-center" key={e.id}>
                                    {e.mata_pelajaran}
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </>
          ) : (
            <div className="w-full min-h-screen flex flex-col justify-center items-center gap-3">
                <p className="text-4xl font-bold">Page Not Allowed</p>
                <p className="text-base">
                    Mohon Login dahulu
                </p>                    
            </div>
          )}
        </main>
        </>
  )
}

export async function getServerSideProps({req, res}){

  return{
    props : {
    }
  }
}