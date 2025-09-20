// Supabase 연결 테스트 스크립트
const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')

// .env.local 파일 직접 읽기
const envFile = fs.readFileSync('.env.local', 'utf8')
const envVars = {}
envFile.split('\n').forEach(line => {
  const [key, value] = line.split('=')
  if (key && value) {
    envVars[key.trim()] = value.trim()
  }
})

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Supabase 연결 테스트 시작...')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseKey ? '✅ 존재함' : '❌ 없음')

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ 환경 변수가 제대로 설정되지 않았습니다.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    // 1. 기본 연결 테스트
    console.log('\n1️⃣ 기본 연결 테스트...')
    const { data, error } = await supabase.from('members').select('count', { count: 'exact', head: true })

    if (error) {
      console.log('❌ 연결 실패:', error.message)
      return
    }

    console.log('✅ 연결 성공!')

    // 2. 테이블 존재 확인
    console.log('\n2️⃣ 테이블 존재 확인...')

    const tables = ['members', 'attendance_sessions', 'attendances']

    for (const table of tables) {
      try {
        const { error: tableError } = await supabase
          .from(table)
          .select('count', { count: 'exact', head: true })

        if (tableError) {
          console.log(`❌ ${table} 테이블: ${tableError.message}`)
        } else {
          console.log(`✅ ${table} 테이블: 존재함`)
        }
      } catch (err) {
        console.log(`❌ ${table} 테이블: ${err.message}`)
      }
    }

    // 3. 샘플 데이터 확인
    console.log('\n3️⃣ 샘플 데이터 확인...')
    const { data: members, error: membersError } = await supabase
      .from('members')
      .select('*')
      .limit(5)

    if (membersError) {
      console.log('❌ 멤버 데이터 조회 실패:', membersError.message)
    } else {
      console.log('✅ 멤버 데이터:', members)
    }

  } catch (error) {
    console.log('❌ 전체 테스트 실패:', error.message)
  }
}

testConnection()