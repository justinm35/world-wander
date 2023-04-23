import { FC } from 'react'
import PublicUserMap from './PublicUserMap'
import PublicPostList from './PublicPostList'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useFetchPubUserInfoQuery } from '../AuthPage/AuthApiSlice'

interface PublicUserProps {
  
}

const PublicUser: FC<PublicUserProps> = ({}) => {
    const params = useParams()
    if(params.username === undefined) return null;
    console.log(params.username)
    
    const {data} = useFetchPubUserInfoQuery(params.username)
    console.log(data)
  return (
    <>
    <PublicUserMap paramsUID={data?.userinfo?._id}/>
      <motion.div 
              initial={{opacity:0, y: -200}}
              animate={{opacity:1, y:0}}
              exit={{opacity:0}}
              className="flex flex-col pl-0 max-w-full xl:pl-32 h-screen w-screen justify-center items-center xl:items-start">
                <div className="w-full pl-5 xl:pl-0 pb-20 xl:pb-32 flex items-center">
                  <img src={'data:image/png;base64,'+ data?.userinfo?.profileImg} className="w-24 h-24 text-zinc-800 rounded-full" /> 
                  <h2 className="text-5xl font-inter font-normal pl-4">Welcome to <br/><span className="text-purple-600 font-bold">{data?.userinfo?.firstName}'s</span> Wanders!</h2>
                </div>
          <PublicPostList paramsUID={data?.userinfo?._id}/>
      </motion.div>
    </>
  )
}

export default PublicUser