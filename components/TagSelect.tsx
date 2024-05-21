"use client"

import { CircleX } from "lucide-react"
import { FC, useEffect, useLayoutEffect, useState } from "react"

interface TagSelectProps {}

export interface Tag {
  _id: string
  name: string
  description: string
  rainbow: boolean
}

export const TagSelect: FC<TagSelectProps> = () => {
  const [availableTags, setAvailableTags] = useState<Tag[]>([])
  const [tagInputValue, setTagInputValue] = useState<string>("")
  const [completions, setCompletions] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<Set<Tag>>(new Set())

  const fetchTags = async () => {
    const response = await fetch("/api/cafe/tags")
    const data = await response.json()
    setAvailableTags(data)
  }

  useEffect(() => {
    fetchTags()
  }, [])

  useLayoutEffect(() => {
    setCompletions(
      availableTags
        .filter((avTag) => avTag.name.toLowerCase().startsWith(tagInputValue.toLowerCase()))
        .filter((t) => !selectedTags.has(t))
        .slice(0, 4)
    )
  }, [tagInputValue, availableTags, selectedTags])

  const addTag = (tag: Tag) => {
    setSelectedTags((st) => {
      st.add(tag)
      return new Set(st)
    })
    setTagInputValue("")
  }

  const removeTag = (tag: Tag) => {
    setSelectedTags((st) => {
      st.delete(tag)
      return new Set(st)
    })
  }

  return (
    <>
      <div className='flex flex-col'>
        <div className='mb-3 mt-5 block text-xs font-medium text-zinc-400'>Wybrane Tagi</div>
      </div>
      <div className='flex flex-wrap gap-2'>
        {Array.from(selectedTags).map((tag, i) => (
          <CafeTag name={tag.name} onClick={() => removeTag(tag)} key={i} rainbow={tag.rainbow} />
        ))}
        {selectedTags.size == 0 && <div className='text-sm text-zinc-200'>Nie wybrano żadnych tagów</div>}
      </div>
      <div>
        <div className='flex flex-col'>
          <label className='mb-3 mt-5 block text-xs font-medium text-zinc-400' htmlFor='preName'>
            Dodaj Tagi
          </label>
          <input
            type='hidden'
            name='tags'
            value={Array.from(selectedTags)
              .map((t) => t._id)
              .join(",")}
          />
          <input
            className={`peer block w-full ${
              completions.length > 0 && tagInputValue.length > 0 ? "rounded-t-md" : "rounded-md "
            } border px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 border-zinc-800 bg-zinc-950 disabled:cursor-not-allowed`}
            autoComplete='off'
            placeholder='Zacznij pisać aby wyszukać tagi'
            value={tagInputValue}
            onChange={(e) => {
              setTagInputValue(e.target.value)
            }}
          />
        </div>

        {completions.length > 0 && tagInputValue.length > 0 && (
          <div className='rounded-b-lg overflow-hidden border border-t-0 border-zinc-800'>
            {completions.map((t, i) => (
              <div
                key={i}
                className='bg-zinc-900/75 hover:bg-zinc-950 p-2  cursor-pointer border-t first:border-0 border-zinc-800'
                onClick={() => addTag(t)}>
                <div
                  className={`text-zinc-100 text-sm leading-6 font-medium text-nowrap text-ellipsis overflow-hidden ${
                    t.rainbow && "animation-rainbow"
                  }`}>
                  {t.name}
                </div>
                <div className='text-zinc-500 text-xs leading-5 font-normal'>{t.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

interface CafeTagProps {
  name: string
  onClick: () => void
  rainbow?: boolean
}

const CafeTag: FC<CafeTagProps> = ({ name, onClick, rainbow }) => {
  return (
    <div
      className={`flex py-1 px-2 items-center gap-1 rounded-lg bg-zinc-900 flex-shrink-0 snap-start text-sm leading-4 font-medium ${
        rainbow && "animation-rainbow"
      }`}
      onClick={onClick}>
      <CircleX size={14} strokeWidth={2} /> {name}
    </div>
  )
}
