'use client'


import React, {useState} from 'react'
import { Dialog, DialogContent } from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"


const AuthModel = () => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <Input/>
        </DialogContent>
      </Dialog>
  )
}

export default AuthModel